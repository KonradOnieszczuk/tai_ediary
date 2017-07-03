package ediary.repository;

import ediary.model.DiaryPart;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiaryPartRepository extends CrudRepository<DiaryPart, Long> {
    @Query("select dp from DiaryPart dp where dp.userId = :userId")
    public List<DiaryPart> findDiaryPartsByUserId(@Param("userId") long userId);
}

