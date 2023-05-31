package com.myrecipe.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.myrecipe.IntegrationTest;
import com.myrecipe.domain.Rule;
import com.myrecipe.domain.enumeration.MyRule;
import com.myrecipe.repository.RuleRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link RuleResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class RuleResourceIT {

    private static final MyRule DEFAULT_RULE_NAME = MyRule.Adim;
    private static final MyRule UPDATED_RULE_NAME = MyRule.User;

    private static final String DEFAULT_RULE_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_RULE_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_CREATION_DATE = "AAAAAAAAAA";
    private static final String UPDATED_CREATION_DATE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/rules";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private RuleRepository ruleRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRuleMockMvc;

    private Rule rule;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Rule createEntity(EntityManager em) {
        Rule rule = new Rule().ruleName(DEFAULT_RULE_NAME).ruleDescription(DEFAULT_RULE_DESCRIPTION).creationDate(DEFAULT_CREATION_DATE);
        return rule;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Rule createUpdatedEntity(EntityManager em) {
        Rule rule = new Rule().ruleName(UPDATED_RULE_NAME).ruleDescription(UPDATED_RULE_DESCRIPTION).creationDate(UPDATED_CREATION_DATE);
        return rule;
    }

    @BeforeEach
    public void initTest() {
        rule = createEntity(em);
    }

    @Test
    @Transactional
    void createRule() throws Exception {
        int databaseSizeBeforeCreate = ruleRepository.findAll().size();
        // Create the Rule
        restRuleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(rule)))
            .andExpect(status().isCreated());

        // Validate the Rule in the database
        List<Rule> ruleList = ruleRepository.findAll();
        assertThat(ruleList).hasSize(databaseSizeBeforeCreate + 1);
        Rule testRule = ruleList.get(ruleList.size() - 1);
        assertThat(testRule.getRuleName()).isEqualTo(DEFAULT_RULE_NAME);
        assertThat(testRule.getRuleDescription()).isEqualTo(DEFAULT_RULE_DESCRIPTION);
        assertThat(testRule.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
    }

    @Test
    @Transactional
    void createRuleWithExistingId() throws Exception {
        // Create the Rule with an existing ID
        rule.setId(1L);

        int databaseSizeBeforeCreate = ruleRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restRuleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(rule)))
            .andExpect(status().isBadRequest());

        // Validate the Rule in the database
        List<Rule> ruleList = ruleRepository.findAll();
        assertThat(ruleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllRules() throws Exception {
        // Initialize the database
        ruleRepository.saveAndFlush(rule);

        // Get all the ruleList
        restRuleMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rule.getId().intValue())))
            .andExpect(jsonPath("$.[*].ruleName").value(hasItem(DEFAULT_RULE_NAME.toString())))
            .andExpect(jsonPath("$.[*].ruleDescription").value(hasItem(DEFAULT_RULE_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE)));
    }

    @Test
    @Transactional
    void getRule() throws Exception {
        // Initialize the database
        ruleRepository.saveAndFlush(rule);

        // Get the rule
        restRuleMockMvc
            .perform(get(ENTITY_API_URL_ID, rule.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(rule.getId().intValue()))
            .andExpect(jsonPath("$.ruleName").value(DEFAULT_RULE_NAME.toString()))
            .andExpect(jsonPath("$.ruleDescription").value(DEFAULT_RULE_DESCRIPTION))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE));
    }

    @Test
    @Transactional
    void getNonExistingRule() throws Exception {
        // Get the rule
        restRuleMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingRule() throws Exception {
        // Initialize the database
        ruleRepository.saveAndFlush(rule);

        int databaseSizeBeforeUpdate = ruleRepository.findAll().size();

        // Update the rule
        Rule updatedRule = ruleRepository.findById(rule.getId()).get();
        // Disconnect from session so that the updates on updatedRule are not directly saved in db
        em.detach(updatedRule);
        updatedRule.ruleName(UPDATED_RULE_NAME).ruleDescription(UPDATED_RULE_DESCRIPTION).creationDate(UPDATED_CREATION_DATE);

        restRuleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedRule.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedRule))
            )
            .andExpect(status().isOk());

        // Validate the Rule in the database
        List<Rule> ruleList = ruleRepository.findAll();
        assertThat(ruleList).hasSize(databaseSizeBeforeUpdate);
        Rule testRule = ruleList.get(ruleList.size() - 1);
        assertThat(testRule.getRuleName()).isEqualTo(UPDATED_RULE_NAME);
        assertThat(testRule.getRuleDescription()).isEqualTo(UPDATED_RULE_DESCRIPTION);
        assertThat(testRule.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
    }

    @Test
    @Transactional
    void putNonExistingRule() throws Exception {
        int databaseSizeBeforeUpdate = ruleRepository.findAll().size();
        rule.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRuleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, rule.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(rule))
            )
            .andExpect(status().isBadRequest());

        // Validate the Rule in the database
        List<Rule> ruleList = ruleRepository.findAll();
        assertThat(ruleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchRule() throws Exception {
        int databaseSizeBeforeUpdate = ruleRepository.findAll().size();
        rule.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRuleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(rule))
            )
            .andExpect(status().isBadRequest());

        // Validate the Rule in the database
        List<Rule> ruleList = ruleRepository.findAll();
        assertThat(ruleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamRule() throws Exception {
        int databaseSizeBeforeUpdate = ruleRepository.findAll().size();
        rule.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRuleMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(rule)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Rule in the database
        List<Rule> ruleList = ruleRepository.findAll();
        assertThat(ruleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateRuleWithPatch() throws Exception {
        // Initialize the database
        ruleRepository.saveAndFlush(rule);

        int databaseSizeBeforeUpdate = ruleRepository.findAll().size();

        // Update the rule using partial update
        Rule partialUpdatedRule = new Rule();
        partialUpdatedRule.setId(rule.getId());

        partialUpdatedRule.ruleDescription(UPDATED_RULE_DESCRIPTION);

        restRuleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRule.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRule))
            )
            .andExpect(status().isOk());

        // Validate the Rule in the database
        List<Rule> ruleList = ruleRepository.findAll();
        assertThat(ruleList).hasSize(databaseSizeBeforeUpdate);
        Rule testRule = ruleList.get(ruleList.size() - 1);
        assertThat(testRule.getRuleName()).isEqualTo(DEFAULT_RULE_NAME);
        assertThat(testRule.getRuleDescription()).isEqualTo(UPDATED_RULE_DESCRIPTION);
        assertThat(testRule.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
    }

    @Test
    @Transactional
    void fullUpdateRuleWithPatch() throws Exception {
        // Initialize the database
        ruleRepository.saveAndFlush(rule);

        int databaseSizeBeforeUpdate = ruleRepository.findAll().size();

        // Update the rule using partial update
        Rule partialUpdatedRule = new Rule();
        partialUpdatedRule.setId(rule.getId());

        partialUpdatedRule.ruleName(UPDATED_RULE_NAME).ruleDescription(UPDATED_RULE_DESCRIPTION).creationDate(UPDATED_CREATION_DATE);

        restRuleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRule.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRule))
            )
            .andExpect(status().isOk());

        // Validate the Rule in the database
        List<Rule> ruleList = ruleRepository.findAll();
        assertThat(ruleList).hasSize(databaseSizeBeforeUpdate);
        Rule testRule = ruleList.get(ruleList.size() - 1);
        assertThat(testRule.getRuleName()).isEqualTo(UPDATED_RULE_NAME);
        assertThat(testRule.getRuleDescription()).isEqualTo(UPDATED_RULE_DESCRIPTION);
        assertThat(testRule.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
    }

    @Test
    @Transactional
    void patchNonExistingRule() throws Exception {
        int databaseSizeBeforeUpdate = ruleRepository.findAll().size();
        rule.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRuleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, rule.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(rule))
            )
            .andExpect(status().isBadRequest());

        // Validate the Rule in the database
        List<Rule> ruleList = ruleRepository.findAll();
        assertThat(ruleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchRule() throws Exception {
        int databaseSizeBeforeUpdate = ruleRepository.findAll().size();
        rule.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRuleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(rule))
            )
            .andExpect(status().isBadRequest());

        // Validate the Rule in the database
        List<Rule> ruleList = ruleRepository.findAll();
        assertThat(ruleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamRule() throws Exception {
        int databaseSizeBeforeUpdate = ruleRepository.findAll().size();
        rule.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRuleMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(rule)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Rule in the database
        List<Rule> ruleList = ruleRepository.findAll();
        assertThat(ruleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteRule() throws Exception {
        // Initialize the database
        ruleRepository.saveAndFlush(rule);

        int databaseSizeBeforeDelete = ruleRepository.findAll().size();

        // Delete the rule
        restRuleMockMvc
            .perform(delete(ENTITY_API_URL_ID, rule.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Rule> ruleList = ruleRepository.findAll();
        assertThat(ruleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
