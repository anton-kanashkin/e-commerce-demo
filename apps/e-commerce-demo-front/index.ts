import { createApp } from '@tramvai/core';
import { CommonModule } from '@tramvai/module-common';
import { SpaRouterModule } from '@tramvai/module-router';
import { RenderModule } from '@tramvai/module-render';
import { ServerModule } from '@tramvai/module-server';
import { ErrorInterceptorModule } from '@tramvai/module-error-interceptor';
import { SeoModule } from '@tramvai/module-seo';
import {
  DEFAULT_HEADER_COMPONENT,
  DEFAULT_FOOTER_COMPONENT,
  RENDER_SLOTS,
  ResourceType,
  ResourceSlot,
} from '@tramvai/tokens-render';

import { Header } from './components/features/Header/Header';
import { Footer } from './components/features/Footer/Footer';
import { globalAction } from './actions/globalAction';

createApp({
  name: 'e-commerce-demo-front',
  modules: [
    CommonModule,
    SpaRouterModule.forRoot([
      // set a static route for the application, which will be available by https://localhost:3000/
      {
        name: 'main',
        path: '/',
      },
      // set a static route for the application, which will be available by https://localhost:3000/second/
      {
        name: 'second',
        path: '/second/',
        config: {
          pageComponent: 'e-commerce-demo-front/second',
        },
      },
    ]),
    RenderModule.forRoot({ mode: 'strict' }),
    SeoModule,
    ServerModule,
    ErrorInterceptorModule,
  ],
  providers: [
    // register a header that will be used for all pages by default
    {
      provide: DEFAULT_HEADER_COMPONENT,
      useValue: Header,
    },
    // register a footer to be used for all pages by default
    {
      provide: DEFAULT_FOOTER_COMPONENT,
      useValue: Footer,
    },
    // register a meta viewport that will be added to each page
    {
      provide: RENDER_SLOTS,
      multi: true,
      useValue: {
        type: ResourceType.asIs,
        slot: ResourceSlot.HEAD_META,
        payload:
          '<meta name="viewport" content="width=device-width, initial-scale=1">',
      },
    },
  ],
  // register actions that will be executed for all pages of the application
  actions: [globalAction],
  bundles: {
    // register a bundle that will be used for all pages by default
    mainDefault: () =>
      import(/* webpackChunkName: "mainDefault" */ './bundles/mainDefault'),
  },
});
