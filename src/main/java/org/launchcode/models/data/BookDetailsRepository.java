package org.launchcode.models.data;

import org.launchcode.models.BookDetails;
import org.springframework.data.repository.CrudRepository;

public interface BookDetailsRepository extends CrudRepository<BookDetails, Integer> {
}
