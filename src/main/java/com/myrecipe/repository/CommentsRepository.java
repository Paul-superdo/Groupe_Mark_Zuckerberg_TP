package com.myrecipe.repository;

import com.myrecipe.domain.Comments;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Comments entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommentsRepository extends JpaRepository<Comments, Long> {
    @Query("select comments from Comments comments where comments.user.login = ?#{principal.username}")
    List<Comments> findByUserIsCurrentUser();
}
