package com.app.jimcarry.domain.vo;

import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
public class InquiryFileVO extends FileVO {
    private Long inquiryId;
}
