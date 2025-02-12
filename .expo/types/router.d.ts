/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/addEdit` | `/addEdit`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/details` | `/details`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/list` | `/list`; params?: Router.UnknownInputParams; } | { pathname: `/comps/TaskContext`; params?: Router.UnknownInputParams; } | { pathname: `/comps/TaskForm`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/addEdit` | `/addEdit`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/details` | `/details`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/list` | `/list`; params?: Router.UnknownOutputParams; } | { pathname: `/comps/TaskContext`; params?: Router.UnknownOutputParams; } | { pathname: `/comps/TaskForm`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/addEdit${`?${string}` | `#${string}` | ''}` | `/addEdit${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/details${`?${string}` | `#${string}` | ''}` | `/details${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/list${`?${string}` | `#${string}` | ''}` | `/list${`?${string}` | `#${string}` | ''}` | `/comps/TaskContext${`?${string}` | `#${string}` | ''}` | `/comps/TaskForm${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/addEdit` | `/addEdit`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/details` | `/details`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/list` | `/list`; params?: Router.UnknownInputParams; } | { pathname: `/comps/TaskContext`; params?: Router.UnknownInputParams; } | { pathname: `/comps/TaskForm`; params?: Router.UnknownInputParams; };
    }
  }
}
