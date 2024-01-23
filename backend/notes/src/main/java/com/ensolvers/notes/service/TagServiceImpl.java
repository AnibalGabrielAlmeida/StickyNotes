package com.ensolvers.notes.service;

import com.ensolvers.notes.model.Note;
import com.ensolvers.notes.model.Tag;
import com.ensolvers.notes.repository.NoteRepository;
import com.ensolvers.notes.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagServiceImpl implements ITagService {

    @Autowired
    TagRepository tagRepository;

    @Override
    public void createTag(Tag tag) {
        tagRepository.save(tag);
    }

    @Override
    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    @Override
    public Tag findById(Long id) {
        return tagRepository.findById(id).orElse(null);
    }

    @Override
    public Tag updateTag(Long id, Tag updateTag) {
        Tag tag = tagRepository.findById(id).orElse(null);
        if (tag != null){
            tag.setName(updateTag.getName());
            return tagRepository.save(tag);
        }

        throw new RuntimeException("Tag not found with id: " + id);
    }

    @Override
    public void deleteTagById(Long id) {
        tagRepository.deleteById(id);
    }
}


