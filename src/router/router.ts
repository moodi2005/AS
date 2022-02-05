/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

 import type { Route } from '@vaadin/router';

 export const routes: Route[] = [
     {
         path: '/',
         name: 'Home',
         component: 'p-start',
         action: async () => {
             await import('../pages/start');
            },
        },
     {
         path: '/group',
         name: 'Crear Group',
         component: 'p-group',
         action: async () => {
             await import('../pages/group');
            },
        },
        {
            path: '/topics',
            name: 'Seclt Topic',
            component: 'p-select_topic',
            action: async () => {
                await import('../pages/select_topic');
            },
        },
        {
          path: '/name',
          name: 'Name',
          component: 'p-name',
          action: async () => {
            await import('../pages/name');
          },
        },
        {
          path: '/result',
          name: 'PREsult',
          component: 'p-result',
          action: async () => {
            await import('../pages/Result');
          },
        },
        {
          path: '/add_word',
          name: 'PAdd_Word',
          component: 'p-add_word',
          action: async () => {
            await import('../pages/add_word');
          },
        },
    ];
 