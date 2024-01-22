package com.ensolvers.notes.service;

import com.ensolvers.notes.model.Tag;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ITagService {
    void createTag(Tag tag);

    List<Tag> getAllTags();

    Tag findById(Long id);

    Tag updateTag(Long id, Tag updatedTag);

    void deleteTagById(Long id);
}