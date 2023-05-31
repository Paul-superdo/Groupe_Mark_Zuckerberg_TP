package com.myrecipe.repository;

import com.myrecipe.domain.Rule;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Rule entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RuleRepository extends JpaRepository<Rule, Long> {
    @Query("select rule from Rule rule where rule.user.login = ?#{principal.username}")
    List<Rule> findByUserIsCurrentUser();
}
