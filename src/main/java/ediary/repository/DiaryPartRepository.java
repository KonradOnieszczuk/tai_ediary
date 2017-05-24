package ediary.repository;

import ediary.model.DiaryPart;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiaryPartRepository extends CrudRepository<DiaryPart, Long> {
}

