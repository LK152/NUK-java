package com.example.java_final_project.schedule;

import java.io.File;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ProgressCleaner {

    private static final String PROGRESS_DIR = "process";

    // 每天中午 12:00 清除進度（cron 格式：秒 分 時 日 月 星期）
    @Scheduled(cron = "0 0 0 * * ?")
    public void clearAllProgress() {
        File dir = new File(PROGRESS_DIR);
        if (dir.exists() && dir.isDirectory()) {
            File[] files = dir.listFiles((d, name) -> name.startsWith("progress_") && name.endsWith(".json"));
            if (files != null) {
                for (File file : files) {
                    file.delete();
                    System.out.println("已清除：" + file.getName());
                }
            }
        }
    }
}
