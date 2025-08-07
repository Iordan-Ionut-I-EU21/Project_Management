package com.example.backend.Service;

import com.example.backend.BackendApplication;
import com.example.backend.Model.Class.PartProduction;
import com.example.backend.Model.Dto.PartProductionFiltersDTO;
import com.example.backend.Repository.PartProductionRepository;
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
public class PartProductionService {
    private static final String CACHEABLE = "PartProduction";
    @Autowired
    private PartProductionRepository partProductionRepository;
    @PersistenceContext
    private EntityManager entityManager;

    public void saveAll(List<PartProduction> partProduction){
        this.partProductionRepository.saveAll(partProduction);
    }

    @Cacheable(cacheNames = CACHEABLE + "findByMachineNameOrIdAndPartProductionFilter", key = "#machine_name_or_id +  @tableRequestCacheKeyHelper.buildProcessLogKey(#tableRequest) + @partProductionCacheKeyHelper.buildPartProductionKey(#partProductionFiltersDTO)")
    public List<PartProduction> findByMachineNameOrIdAndPartProductionFilter(final String machine_name_or_id, final TableRequest tableRequest, final PartProductionFiltersDTO partProductionFiltersDTO) {
        PageRequest pageRequest = BackendApplication.generateTablePage(tableRequest);
        return this.partProductionRepository.findByMachineNameOrIdAndPartProductionFilter(machine_name_or_id, pageRequest, partProductionFiltersDTO.getPart_id_name(), partProductionFiltersDTO.getPart_id_category(), partProductionFiltersDTO.getProduced_date(), partProductionFiltersDTO.getQuantity(), partProductionFiltersDTO.getPart_id_unit_cost());
    }

    @Cacheable(cacheNames = CACHEABLE + "countByMachineNameOrIdAndPartProductionFilter", key = "#machine_name_or_id + @partProductionCacheKeyHelper.buildPartProductionKey(#partProductionFiltersDTO)")
    public Long countByMachineNameOrIdAndPartProductionFilter(final String machine_name_or_id, final PartProductionFiltersDTO partProductionFiltersDTO) {
        return this.partProductionRepository.countByMachineNameOrIdAndPartProductionFilter(machine_name_or_id, partProductionFiltersDTO.getPart_id_name(), partProductionFiltersDTO.getPart_id_category(), partProductionFiltersDTO.getProduced_date(), partProductionFiltersDTO.getQuantity(), partProductionFiltersDTO.getPart_id_unit_cost());
    }

    @Cacheable(cacheNames = CACHEABLE + "excelDataByMachineNameOrIdAndPartProductionFilters", key = "#machine_name_or_id +'_'+#columns + @partProductionCacheKeyHelper.buildPartProductionKey(#partProductionFiltersDTO)")
    public List<Object[]> excelDataByMachineNameOrIdAndPartProductionFilters(String machine_name_or_id, String columns, PartProductionFiltersDTO partProductionFiltersDTO) {
        TypedQuery<Object[]> query = this.entityManager.createQuery("SELECT " + columns + PartProduction.QUERY + PartProductionFiltersDTO.QUERY, Object[].class);
        query.setParameter("machine_name_or_id", machine_name_or_id);
        query.setParameter("part_id_name", partProductionFiltersDTO.getPart_id_name());
        query.setParameter("part_id_category", partProductionFiltersDTO.getPart_id_category());
        query.setParameter("produced_date", partProductionFiltersDTO.getProduced_date());
        query.setParameter("quantity", partProductionFiltersDTO.getQuantity());
        query.setParameter("part_id_unit_cost", partProductionFiltersDTO.getPart_id_unit_cost());
        return query.getResultList();
    }
}
