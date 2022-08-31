package com.stackoverflow.backend.tag.domain;


import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id")
    private Long id;

    @Column
    private String tagName;

    @Builder
    public Tag(String tagName){
        this.tagName = tagName;
    }

}
