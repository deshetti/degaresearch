import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { Article } from 'app/shared/model/article.model';
import { ArticleService } from './article.service';
import { ArticleComponent } from './article.component';
import { ArticleDetailComponent } from './article-detail.component';
import { ArticleUpdateComponent } from './article-update.component';
import { ArticleDeletePopupComponent } from './article-delete-dialog.component';
import { IArticle } from 'app/shared/model/article.model';

@Injectable({ providedIn: 'root' })
export class ArticleResolve implements Resolve<IArticle> {
    constructor(private service: ArticleService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((article: HttpResponse<Article>) => article.body);
        }
        return Observable.of(new Article());
    }
}

export const articleRoute: Routes = [
    {
        path: 'article',
        component: ArticleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Articles'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'article/:id/view',
        component: ArticleDetailComponent,
        resolve: {
            article: ArticleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Articles'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'article/new',
        component: ArticleUpdateComponent,
        resolve: {
            article: ArticleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Articles'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'article/:id/edit',
        component: ArticleUpdateComponent,
        resolve: {
            article: ArticleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Articles'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const articlePopupRoute: Routes = [
    {
        path: 'article/:id/delete',
        component: ArticleDeletePopupComponent,
        resolve: {
            article: ArticleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Articles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
