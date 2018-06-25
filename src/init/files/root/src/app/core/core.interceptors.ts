import {environment} from '@env/environment';
import {Injectable, NgModule} from '@angular/core';
import {
    HTTP_INTERCEPTORS,
    HttpClientModule,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';

import {Observable} from 'rxjs';

const API_URL_TOKEN = "/api/";

@Injectable()
export class APIInterceptor implements HttpInterceptor
{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        if (environment.apiUrl && environment.apiUrl !== API_URL_TOKEN && req.url.startsWith(API_URL_TOKEN)) {
            let url = environment.apiUrl + req.url.substr(API_URL_TOKEN.length);
            req = req.clone({
                url: url
            });
        }

        return next.handle(req);
    }
}


@NgModule({
    imports: [ HttpClientModule ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true }
    ]
})
export class InterceptorsModule {}
