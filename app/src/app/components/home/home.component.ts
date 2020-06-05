import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlacesService } from 'src/app/services/places.service';
import { SearchPipe } from 'src/app/pipes/search.pipe';
import { NgxSpinnerService } from "ngx-spinner";
import { FooterService } from 'src/app/services/footer.service';
import { NavbarServiceService } from 'src/app/services/navbar-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchText = ''
  name = ''
  showDropDown = false
  placename: string
  placeNames = []

  searchForm: FormGroup

  public placeholder: string = 'Enter the search text'
  public keyword = 'name';
  public historyHeading: string = 'Recently selected';

  constructor(
    private fb: FormBuilder, 
    private places: PlacesService,
    private spinner: NgxSpinnerService,
    public nav: NavbarServiceService,
    public footer: FooterService
    ) {
      this.searchForm = fb.group({
        search: [{value: '', disabled: false}, Validators.required]
      })
      this.nav.show()
      this.footer.show()
    }

  page = {
    title: "Home",
    subtitle: "Welcome to Tourist guide",
    image: "../../../assets/background1.jpg"
  }

  ngOnInit() {

    this.spinner.show()
    this.places.getPlacesExcel()
    .subscribe(
      res => {
        for(let i = 0; i < res.length; i++) {
          this.placeNames.push(res[i][0])
        }
        this.spinner.hide()
        
      },
      err => console.log(err)
    )

    this.placename = this.searchForm.value
    //this.placename = this.placename.toUpperCase()
    if(this.placeNames.includes(this.placename)){
      this.placeNames.push(this.placename.toUpperCase())
    }

  }

  selectValue(value) {
    this.searchForm.patchValue({"search": value});
    this.showDropDown = false;
  }

  getSearchValue() {
    return this.searchForm.value.search;
  }

  showSuggestion(){
    this.showDropDown = true
  }

  closeDropDown(){
    return this.showDropDown = false
  }

  onSubmit() {
    if(this.searchForm.valid){
      console.log(this.searchForm.value)
    }
  }
  
}
