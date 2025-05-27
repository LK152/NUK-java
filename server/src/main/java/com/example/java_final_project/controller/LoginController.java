package com.example.java_final_project.controller;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.java_final_project.util.JsonUtil;
import com.google.gson.reflect.TypeToken;

@RestController
@RequestMapping("/auth")
public class LoginController {

    private static final String USER_FILE = "users.json";
    private static final Type USER_LIST_TYPE = new TypeToken<List<Map<String, String>>>() {}.getType();

    @PostMapping("/login") //後台登入
    public ResponseEntity<String> login(@RequestBody Map<String, String> body) throws IOException {
        String username = body.get("username");
        String password = body.get("password");

        if (username == null || password == null || username.isEmpty() || password.isEmpty()) {
            return ResponseEntity.badRequest().body("帳號或密碼不得為空");
        }

        List<Map<String, String>> users = JsonUtil.readList(USER_FILE, USER_LIST_TYPE);
        boolean valid = users.stream().anyMatch(u ->
            username.equals(u.get("username")) && password.equals(u.get("password"))
        );

        if (valid) {
            return ResponseEntity.ok("success");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("fail");
        }
    }

    @PostMapping("/register") // 使用者註冊
    public ResponseEntity<String> register(@RequestBody Map<String, String> body) throws IOException {
        String username = body.get("username");
        String password = body.get("password");

        if (username == null || password == null || username.isEmpty() || password.isEmpty()) {
            return ResponseEntity.badRequest().body("帳號或密碼不得為空");
        }

        List<Map<String, String>> users = JsonUtil.readList(USER_FILE, USER_LIST_TYPE);
        boolean exists = users.stream().anyMatch(u -> username.equals(u.get("username")));

        if (exists) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("帳號已存在");
        }

        Map<String, String> newUser = new HashMap<>();
        newUser.put("username", username);
        newUser.put("password", password);
        users.add(newUser);

        JsonUtil.writeList(USER_FILE, users);
        return ResponseEntity.ok("註冊成功");
    }

    @GetMapping("/users") // 使用者名稱
    public List<Map<String, String>> getUsers() throws IOException {
        return JsonUtil.readList(USER_FILE, USER_LIST_TYPE);
    }
}