package com.example.backend.Repository;

import com.example.backend.Model.Class.PartSuppliers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartSuppliersRepository extends JpaRepository<PartSuppliers, String> {
}
