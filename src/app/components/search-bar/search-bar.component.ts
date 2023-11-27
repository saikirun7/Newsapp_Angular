import { SearchApiService } from './../../services/search-api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  @Output('searchResult') searchResult = new EventEmitter();
  constructor(private searchApi: SearchApiService) {}

  ngOnInit(): void {}

  searchForm = new FormGroup({
    search: new FormControl(''),
  });

  onSearch() {
    if (this.searchForm.valid) {
      this.searchApi
        .searchNews(this.searchForm.value.search)
        .subscribe((response) => {
          this.searchResult.emit(response.articles);
          //this.searchForm.setValue({ search: '' });
        });
    }
  }
}
