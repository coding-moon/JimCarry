package com.app.jimcarry.domain.dao;

import com.app.jimcarry.domain.vo.ReviewFileVO;
import com.app.jimcarry.mapper.ReviewFileMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class ReviewFileDAOTest {

    @Autowired
    ReviewFileDAO reviewFileDAO;
    @Autowired
    ReviewFileVO reviewFileVO;
    @BeforeEach
    void setReviewFileVO(){
        reviewFileVO.setReviewId(1L);
        reviewFileVO.setFileOrgName("테스트1.png");
        reviewFileVO.setFilePath(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd")));
        reviewFileVO.setFileUuid(UUID.randomUUID().toString());
    }
    @Test
    void save() {
        reviewFileDAO.save(reviewFileVO);
    }

    @Test
    void findAll() {
        reviewFileDAO.save(reviewFileVO);
        reviewFileDAO.findAll(2L);
    }

    @Test
    void deleteById() {
        reviewFileDAO.save(reviewFileVO);
        reviewFileDAO.deleteById(reviewFileVO.getFileId());
    }
}