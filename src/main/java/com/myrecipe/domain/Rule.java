package com.myrecipe.domain;

import com.myrecipe.domain.enumeration.MyRule;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Rule.
 */
@Entity
@Table(name = "rule")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Rule implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "rule_name")
    private MyRule ruleName;

    @Column(name = "rule_description")
    private String ruleDescription;

    @Column(name = "creation_date")
    private String creationDate;

    @ManyToOne
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Rule id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MyRule getRuleName() {
        return this.ruleName;
    }

    public Rule ruleName(MyRule ruleName) {
        this.setRuleName(ruleName);
        return this;
    }

    public void setRuleName(MyRule ruleName) {
        this.ruleName = ruleName;
    }

    public String getRuleDescription() {
        return this.ruleDescription;
    }

    public Rule ruleDescription(String ruleDescription) {
        this.setRuleDescription(ruleDescription);
        return this;
    }

    public void setRuleDescription(String ruleDescription) {
        this.ruleDescription = ruleDescription;
    }

    public String getCreationDate() {
        return this.creationDate;
    }

    public Rule creationDate(String creationDate) {
        this.setCreationDate(creationDate);
        return this;
    }

    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Rule user(User user) {
        this.setUser(user);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Rule)) {
            return false;
        }
        return id != null && id.equals(((Rule) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Rule{" +
            "id=" + getId() +
            ", ruleName='" + getRuleName() + "'" +
            ", ruleDescription='" + getRuleDescription() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            "}";
    }
}
