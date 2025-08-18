package com.example.backend.Service;

import com.example.backend.BackendApplication;
import com.example.backend.Model.Class.QualityChecks;
import com.example.backend.Model.Dto.QualityChecksFiltersDTO;
import com.example.backend.Repository.QualityCheckRepository;
import com.example.backend.Utility.TableRequest;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QualityChecksService {
    private static final String CACHEABLE = "Quality_Checks";
    @Autowired
    private QualityCheckRepository qualityCheckRepository;
    @PersistenceContext
    private EntityManager entityManager;

    public void saveAll(List<QualityChecks> qualityChecks){
        this.qualityCheckRepository.saveAll(qualityChecks);
    }

    public List<QualityChecks> findAll(){
        return  this.qualityCheckRepository.findAll();
    }

    @Cacheable(cacheNames = CACHEABLE + "findByUserName", key = "#name + @tableRequestCacheKeyHelper.buildProcessLogKey(#tableRequest)  +  @qualityChecksCacheKeyHelper.buildQualityChecksKey(#qualityChecksFiltersDTO)")
    public List<QualityChecks> findByUserName(final String name, final TableRequest tableRequest, final QualityChecksFiltersDTO qualityChecksFiltersDTO) {
        PageRequest pageRequest = BackendApplication.generateTablePage(tableRequest);
		return this.qualityCheckRepository.findByUserName(name, pageRequest, qualityChecksFiltersDTO.getCar_id_model_id_name(), qualityChecksFiltersDTO.getCar_id_model_id_generation(), qualityChecksFiltersDTO.getCar_id_model_id_release_year(), qualityChecksFiltersDTO.getInspector_id_name(), qualityChecksFiltersDTO.getCheck_date(), qualityChecksFiltersDTO.getPassed(), qualityChecksFiltersDTO.getCar_id_status());
    }

    @Cacheable(cacheNames = CACHEABLE + "countByUserName", key = "#name +  @qualityChecksCacheKeyHelper.buildQualityChecksKey(#qualityChecksFiltersDTO)")
    public Long countByUserName(final String name, final QualityChecksFiltersDTO qualityChecksFiltersDTO) {
		return this.qualityCheckRepository.countByUserName(name, qualityChecksFiltersDTO.getCar_id_model_id_name(), qualityChecksFiltersDTO.getCar_id_model_id_generation(), qualityChecksFiltersDTO.getCar_id_model_id_release_year(), qualityChecksFiltersDTO.getInspector_id_name(), qualityChecksFiltersDTO.getCheck_date(), qualityChecksFiltersDTO.getPassed(), qualityChecksFiltersDTO.getCar_id_status());
    }

    @Cacheable(cacheNames = CACHEABLE + "getExcelByUserName", key = "#name + '_' + #columns+  @qualityChecksCacheKeyHelper.buildQualityChecksKey(#qualityChecksFiltersDTO)")
    public List<Object[]> getExcelByUserName(final String name, final String columns, final QualityChecksFiltersDTO qualityChecksFiltersDTO) {
        TypedQuery<Object[]> query = this.entityManager.createQuery("SELECT " + columns + QualityChecks.QUERY + " u.username = :username " + QualityChecksFiltersDTO.QUERY, Object[].class);
        query.setParameter("username", name);
        query.setParameter("car_id_model_id_name", qualityChecksFiltersDTO.getCar_id_model_id_name());
        query.setParameter("car_id_model_id_generation", qualityChecksFiltersDTO.getCar_id_model_id_generation());
        query.setParameter("car_id_model_id_release_year", qualityChecksFiltersDTO.getCar_id_model_id_release_year());
        query.setParameter("inspector_id_name", qualityChecksFiltersDTO.getInspector_id_name());
        query.setParameter("check_date", qualityChecksFiltersDTO.getCheck_date());
        query.setParameter("passed", qualityChecksFiltersDTO.getPassed());
		query.setParameter("car_id_status", qualityChecksFiltersDTO.getCar_id_status());
        return BackendApplication.generateDateWithStartTimeAndEndTIme(query.getResultList(), columns);
    }

    @Cacheable(cacheNames = CACHEABLE + "canAccessPage", key = "#quality_id +'_'+ #username")
    public Boolean canAccessPage(final String quality_id, final String username) {
        Integer c1 = this.qualityCheckRepository.canAccessPageQualityChecks(quality_id, username);
        Integer c2 = this.qualityCheckRepository.canAccessPageProcessLog(quality_id, username);
        return c1 == 0 && c2 == 0;
    }

    @Cacheable(cacheNames = CACHEABLE + "findQualityChecksById", key = "#quality_id")
    public QualityChecks findQualityChecksById(final String quality_id){
        return this.qualityCheckRepository.findQualityChecksById(quality_id);
    }
}
