package com.example.java_final_project.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.java_final_project.model.Spot;
import com.example.java_final_project.util.JsonUtil;

@RestController
public class SpotController {

    @GetMapping("/spots")
    public List<Spot> getSpots() throws IOException {
        return JsonUtil.readList("spots.json", Spot.class);
    }

    @PostMapping("/spots/upload")
    public ResponseEntity<String> uploadSpot(
        @RequestParam("name") String name,
        @RequestParam("lat") double lat,
        @RequestParam("lng") double lng,
        @RequestParam("description") String description,
        @RequestParam("image") MultipartFile imageFile
    ) throws IOException {
        String uploadDir = new File("images/spots").getAbsolutePath() + File.separator;
        File dir = new File(uploadDir);
        if (!dir.exists()) dir.mkdirs();

        String filename = UUID.randomUUID() + imageFile.getOriginalFilename();
        File saveFile = new File(uploadDir + filename);
        imageFile.transferTo(saveFile);

        List<Spot> spots = JsonUtil.readList("spots.json", Spot.class);
        Spot newSpot = new Spot(name, lat, lng, description, filename);
        spots.add(newSpot);
        JsonUtil.writeList("spots.json", spots);

        return ResponseEntity.ok("景點新增成功");
    }

    @PutMapping("/spots/update")
    public ResponseEntity<String> updateSpotWithImage(
        @RequestParam("name") String name,
        @RequestParam("lat") double lat,
        @RequestParam("lng") double lng,
        @RequestParam("description") String description,
        @RequestParam(value = "image", required = false) MultipartFile imageFile
    ) throws IOException {
        List<Spot> spots = JsonUtil.readList("spots.json", Spot.class);
        for (int i = 0; i < spots.size(); i++) {
            if (spots.get(i).getName().equals(name)) {
                Spot spot = spots.get(i);
                spot.setLat(lat);
                spot.setLng(lng);
                spot.setDescription(description);

                if (imageFile != null && !imageFile.isEmpty()) {
                    String uploadDir = new File("images/spots").getAbsolutePath() + File.separator;
                    File dir = new File(uploadDir);
                    if (!dir.exists()) dir.mkdirs();

                    String filename = UUID.randomUUID() + imageFile.getOriginalFilename();
                    File saveFile = new File(uploadDir + filename);
                    imageFile.transferTo(saveFile);
                    spot.setImage(filename);
                }

                spots.set(i, spot);
                break;
            }
        }
        JsonUtil.writeList("spots.json", spots);
        return ResponseEntity.ok("景點修改成功");
    }

    @PutMapping("/spots/{name}")
    public void updateSpot(@PathVariable String name, @RequestBody Spot updatedSpot) throws IOException {
        List<Spot> spots = JsonUtil.readList("spots.json", Spot.class);
        for (int i = 0; i < spots.size(); i++) {
            if (spots.get(i).getName().equals(name)) {
                spots.set(i, updatedSpot);
                break;
            }
        }
        JsonUtil.writeList("spots.json", spots);
    }

    @DeleteMapping("/spots/{name}")
    public void deleteSpot(@PathVariable String name) throws IOException {
        List<Spot> spots = JsonUtil.readList("spots.json", Spot.class);
        spots.removeIf(s -> s.getName().equals(name));
        JsonUtil.writeList("spots.json", spots);
    }

    @GetMapping("/spots/search")
    public List<Spot> searchSpots(@RequestParam String keyword) throws IOException {
        List<Spot> spots = JsonUtil.readList("spots.json", Spot.class);
        return spots.stream()
                .filter(spot -> spot.matchesKeyword(keyword))
                .collect(Collectors.toList());
    }
}