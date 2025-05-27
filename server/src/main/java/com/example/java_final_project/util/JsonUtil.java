package com.example.java_final_project.util;

import com.google.gson.*;
import com.google.gson.reflect.TypeToken;

import java.io.*;
import java.lang.reflect.Type;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

public class JsonUtil {

    // ✅ 支援 readList(Class<T>)：常見用法（如 Spot.class）
    public static <T> List<T> readList(String path, Class<T> clazz) throws IOException {
        File file = new File(path);
        if (!file.exists()) {
            return new ArrayList<>();
        }

        Gson gson = new Gson();
        Reader reader = new InputStreamReader(new FileInputStream(file), StandardCharsets.UTF_8);
        Type type = TypeToken.getParameterized(List.class, clazz).getType();
        List<T> list = gson.fromJson(reader, type);
        reader.close();
        return list;
    }

    // ✅ 支援 readList(Type)：進階用法（如 Map<String, String>）
    public static <T> List<T> readList(String path, Type type) throws IOException {
        File file = new File(path);
        if (!file.exists()) {
            return new ArrayList<>();
        }

        Gson gson = new Gson();
        Reader reader = new InputStreamReader(new FileInputStream(file), StandardCharsets.UTF_8);
        List<T> list = gson.fromJson(reader, type);
        reader.close();
        return list;
    }

    // ✅ 統一 writeList() 支援 UTF-8 編碼
    public static <T> void writeList(String path, List<T> list) throws IOException {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        Writer writer = new OutputStreamWriter(new FileOutputStream(path), StandardCharsets.UTF_8);
        gson.toJson(list, writer);
        writer.close();
    }
}