import { Component, OnInit, VERSION } from '@angular/core';
import { LocaleService } from '@dcs/ngx-utils';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'dcs-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private localeService: LocaleService
  ) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.logBuildSetup(event.lang);
    });
    this.localeService.setup();
  }

  public ngOnInit(): void {
    console.timeEnd('bootstrap angular');
    this.logBuildSetup(this.translate.currentLang);

    setTimeout(() => {
      this.translate.use('en');
    }, 5000);

    // window['app'] = this;
  }

  private logBuildSetup(locale: string) {
    console.log(
      this.translate.instant('BUILD_SETUP', {
        angularVersion: VERSION.full,
        tsVersion: TS_VERSION,
        env: ENV,
        locale
      })
    );
  }
}
