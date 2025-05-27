package com.example.java_final_project.util;
import java.util.Scanner;

public class DistanceCalculator {
    public static void main(String[] args) {
        int x1, y1;
        int x2, y2;
        Scanner scanner = new Scanner(System.in);
        x1 = scanner.nextInt();
        y1 = scanner.nextInt();
        x2 = scanner.nextInt();
        y2 = scanner.nextInt();
        double d = Math.hypot(x2 - x1, y2 - y1);
        System.out.printf("兩點距離為：%.2f 像素\n", d);
    }
}
