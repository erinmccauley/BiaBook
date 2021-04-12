import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from '../review';
import { AccountService } from '../Services/account.service';
import { ReviewsService } from '../Services/reviews.service';

@Component({
  selector: 'app-createreview',
  templateUrl: './createreview.component.html',
  styleUrls: ['./createreview.component.css']
})

export class CreatereviewComponent implements OnInit {
  form: FormGroup;
  author: any[];

  constructor(private formBuilder: FormBuilder, private reviewService: ReviewsService,
    private accountService: AccountService, 
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      review: ['', Validators.required],
      rating: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }


  async onSubmit() {
    var newReview = new Review();
    var username = this.accountService.getToken();
    var recipeId = +this.route.snapshot.params.id;
    let author = await this.accountService.getIdByUsername(username);    
    //if (this.form.invalid){
    //  return;
    //}

    newReview.AuthorId = author[0].id;
    newReview.DateModified = new Date().toISOString().slice(0, 19).replace('T', ' ');
    newReview.DateSubmitted = new Date().toISOString().slice(0, 19).replace('T', ' ');
    newReview.Rating = this.f.rating.value;
    newReview.RecipeId = recipeId;
    newReview.Review = this.f.review.value;

    this.reviewService.postReview(newReview.AuthorId, newReview.DateModified,
      newReview.DateSubmitted, newReview.Rating, newReview.RecipeId, newReview.Review )
    .pipe()
    .subscribe(data => {
      this.router.navigate(['recipe/', recipeId])
    });
    console.log(author[0].id);
    console.log(newReview);
  }

}
