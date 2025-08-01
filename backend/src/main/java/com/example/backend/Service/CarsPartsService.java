package com.example.backend.Service;

import com.example.backend.BackendApplication;
import com.example.backend.Model.Class.CarParts;
import com.example.backend.Model.Dto.CarsPartsFiltersDTO;
import com.example.backend.Repository.CarsPartsRepository;
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
public class CarsPartsService {
    private static final String CACHEABLE = "Cars_Parts";
    @Autowired
    private CarsPartsRepository carsPartsRepository;
    @PersistenceContext
    private EntityManager entityManager;

    public void saveAll(List<CarParts> carParts){
        this.carsPartsRepository.saveAll(carParts);
    }

    @Cacheable(cacheNames = CACHEABLE + "findByUserNameAndCarsPartsFilters", key = "#username + (#tableRequest?.KEY " + "?: '') + @carsPartsCacheKeyHelper.buildCarsPartsKey(#carsPartsFiltersDTO)")
    public List<CarParts> findByUserNameAndCarsPartsFilters(final String username, final TableRequest tableRequest, final CarsPartsFiltersDTO carsPartsFiltersDTO) {
        PageRequest pageRequest = BackendApplication.generateTablePage(tableRequest);
        return this.carsPartsRepository.findByUserNameAndCarsPartsFilters(username, pageRequest, carsPartsFiltersDTO.getPart_id_unit_cost(), carsPartsFiltersDTO.getQuantity(), carsPartsFiltersDTO.getInstalled_by_name(), carsPartsFiltersDTO.getPart_id_category(), carsPartsFiltersDTO.getPart_id_name(), carsPartsFiltersDTO.getCar_id_model_id_name());
    }

    @Cacheable(cacheNames = CACHEABLE + "countByUserNameAndCarsPartsFilters", key = "#username+ @carsPartsCacheKeyHelper.buildCarsPartsKey(#carsPartsFiltersDTO)")
    public Long countByUserNameAndCarsPartsFilters(final String username, final CarsPartsFiltersDTO carsPartsFiltersDTO) {
        return this.carsPartsRepository.countByUserNameAndCarsPartsFilters(username, carsPartsFiltersDTO.getPart_id_unit_cost(), carsPartsFiltersDTO.getQuantity(), carsPartsFiltersDTO.getInstalled_by_name(), carsPartsFiltersDTO.getPart_id_category(), carsPartsFiltersDTO.getPart_id_name(), carsPartsFiltersDTO.getCar_id_model_id_name());
    }

    @Cacheable(cacheNames = CACHEABLE + "getExcelByUserNameAndCarsPartsFilters", key = "#username + '_' +#columns  +@carsPartsCacheKeyHelper.buildCarsPartsKey(#carsPartsFiltersDTO)")
    public List<Object[]> getExcelByUserNameAndCarsPartsFilters(final String username, final String columns, final CarsPartsFiltersDTO carsPartsFiltersDTO) {
        TypedQuery<Object[]> query = this.entityManager.createQuery("SELECT " + columns + CarParts.QUERY + " u.username = :username", Object[].class);
        query.setParameter("username", username);
        query.setParameter("part_id_unit_cost", carsPartsFiltersDTO.getPart_id_unit_cost());
        query.setParameter("quantity", carsPartsFiltersDTO.getQuantity());
        query.setParameter("installed_by_name", carsPartsFiltersDTO.getInstalled_by_name());
        query.setParameter("part_id_category", carsPartsFiltersDTO.getPart_id_category());
        query.setParameter("part_id_name", carsPartsFiltersDTO.getPart_id_name());
        query.setParameter("car_id_model_id_name", carsPartsFiltersDTO.getCar_id_model_id_name());
        return BackendApplication.generateDateWithStartTimeAndEndTIme(query.getResultList(), columns);
    }
}
