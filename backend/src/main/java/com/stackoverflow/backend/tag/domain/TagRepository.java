package com.stackoverflow.backend.tag.domain;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Tag findByTagName(String tagName);
    Boolean existsByTagName(String tagName);
}
