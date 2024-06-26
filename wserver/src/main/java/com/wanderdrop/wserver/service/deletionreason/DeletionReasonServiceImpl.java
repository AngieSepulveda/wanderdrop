package com.wanderdrop.wserver.service.deletionreason;

import com.wanderdrop.wserver.dto.DeletionReasonDto;
import com.wanderdrop.wserver.mapper.DeletionReasonMapper;
import com.wanderdrop.wserver.repository.DeletionReasonRepository;
import org.springframework.stereotype.Service;
import com.wanderdrop.wserver.model.DeletionReason;


import java.util.List;
import java.util.stream.Collectors;

@Service
public class DeletionReasonServiceImpl implements DeletionReasonService {
    private final DeletionReasonRepository deletionReasonRepository;
    private final DeletionReasonMapper deletionReasonMapper;

    public DeletionReasonServiceImpl(DeletionReasonRepository deletionReasonRepository, DeletionReasonMapper deletionReasonMapper) {
        this.deletionReasonRepository = deletionReasonRepository;
        this.deletionReasonMapper = deletionReasonMapper;
    }

    @Override
    public List<DeletionReasonDto> getDefaultDeletionReasons() {
        return deletionReasonRepository.findAll().stream()
                .filter(DeletionReason::isDefaultReason)
                .map(deletionReasonMapper::mapToDeletionReasonDto)
                .collect(Collectors.toList());
    }

    @Override
    public DeletionReasonDto saveDeletionReason(DeletionReasonDto deletionReasonDto) {
        DeletionReason deletionReason = deletionReasonMapper.mapToDeletionReason(deletionReasonDto);
        deletionReason.setDefaultReason(false);
        deletionReason = deletionReasonRepository.save(deletionReason);
        return deletionReasonMapper.mapToDeletionReasonDto(deletionReason);
    }
}
