package com.example.java_final_project.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.java_final_project.model.Spot;
import com.example.java_final_project.util.JsonUtil;

@RestController
@RequestMapping("/progress")
public class UserProgressController {

    private static final String PROGRESS_DIR = "progress/";

    // 內部類別：對應 users.json 結構
    private static class User {
        public String username;
    }

    // 取得使用者探索進度（完整 Spot 資訊）
    @GetMapping("/{username}")
    public ResponseEntity<?> getProgress(@PathVariable String username) throws IOException {
        ensureDirectoryExists();

        List<String> visitedNames = JsonUtil.readList(PROGRESS_DIR + "progress_" + username + ".json", String.class);
        List<Spot> allSpots = JsonUtil.readList("spots.json", Spot.class);

        List<Spot> visitedSpots = allSpots.stream()
            .filter(s -> visitedNames.contains(s.getName()))
            .collect(Collectors.toList());

        return ResponseEntity.ok(visitedSpots);
    }

    // 新增景點至進度
    @PostMapping("/{username}")
    public ResponseEntity<String> addSpot(@PathVariable String username, @RequestBody Map<String, String> body) throws IOException {
        ensureDirectoryExists();

        String spotName = body.get("name");

        List<User> users = JsonUtil.readList("users.json", User.class);
        boolean exists = users.stream().anyMatch(u -> u.username.equals(username));
        if (!exists) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("尚未註冊帳號，請先註冊後再使用探索功能");
        }

        List<String> progress = JsonUtil.readList(PROGRESS_DIR + "progress_" + username + ".json", String.class);

        if (!progress.contains(spotName)) {
            progress.add(spotName);
            JsonUtil.writeList(PROGRESS_DIR + "progress_" + username + ".json", progress);
        }

        return ResponseEntity.ok("已記錄進度");
    }

    // 確保資料夾存在
    private void ensureDirectoryExists() {
        File dir = new File(PROGRESS_DIR);
        if (!dir.exists()) dir.mkdirs();
    }


    
}