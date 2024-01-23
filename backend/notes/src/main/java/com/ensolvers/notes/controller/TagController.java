package com.ensolvers.notes.controller;

import com.ensolvers.notes.model.Tag;
import com.ensolvers.notes.service.ITagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tag")
public class TagController {

    @Autowired
    private ITagService tagService;

    /* Utilizing ResponseEntity for custom error handling. ResponseEntity provides precise control
     * over HTTP response details, allowing consistent error messages and status codes in the API.
     * Planning to enhance error and exception handling in the future.*/
    @PostMapping("/create")
    public ResponseEntity<Void> createTag(@RequestBody Tag tag) {
        tagService.createTag(tag);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/list")
    public ResponseEntity<List<Tag>> getAllTags() {
        List<Tag> tags = tagService.getAllTags();
        return new ResponseEntity<>(tags, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Tag> getTagById(@PathVariable Long id) {
        Tag tag = tagService.findById(id);
        return tag != null
                ? new ResponseEntity<>(tag, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Tag> updateTag(@PathVariable Long id, @RequestBody Tag updateTag) {
        Tag updatedTag = tagService.updateTag(id, updateTag);
        return updatedTag != null
                ? new ResponseEntity<>(updatedTag, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTagById(@PathVariable Long id) {
        tagService.deleteTagById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
