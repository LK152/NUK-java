package com.example.java_final_project.model;

public class Spot {
    public String name;
    public double lat, lng;
    public String description;
    public String image;
    

    public Spot(String name, double lat, double lng, String description, String image) {
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.description = description;
        this.image = image;
    }

    public Spot(){}

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public double getLat(){
        return lat;
    }

    public void setLat(double lat){
        this.lat = lat;
    }

    public double getLng(){
        return lng;
    }

    public void setLng(double lng){
        this.lng = lng;
    }

    public String getDescription(){
        return description;
    }

    public void setDescription(String description){
        this.description = description;
    }

    public boolean matchesKeyword(String keyword){
        keyword = keyword.toLowerCase();
        return(name != null && name.toLowerCase().contains(keyword)) ||
            (description != null && description.toLowerCase().contains(keyword));
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}