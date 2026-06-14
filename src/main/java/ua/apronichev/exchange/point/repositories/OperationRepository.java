package ua.apronichev.exchange.point.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.apronichev.exchange.point.model.Operation;

@Repository
public interface OperationRepository extends JpaRepository<Operation, Long> {
}
