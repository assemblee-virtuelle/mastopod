import { Admin, Resource, CustomRoutes } from "react-admin";
import { BrowserRouter, Route } from "react-router-dom";
import { QueryClient } from "react-query";

import dataProvider from "./config/dataProvider";
import authProvider from "./config/authProvider";

import Layout from "./layout/Layout";

import PodLoginPage from "./pages/PodLoginPage/PodLoginPage";
import HomePage from "./pages/HomePage";
import ActorPage from "./pages/ActorPage/ActorPage";
import { default as ActorPosts } from "./pages/ActorPage/Posts";
import { default as ActorPostsAndReplies } from "./pages/ActorPage/PostsAndReplies";
import { default as ActorFollowers } from "./pages/ActorPage/Followers";
import { default as ActorFollowing } from "./pages/ActorPage/Following";
import MainPage from "./pages/MainPage/MainPage";
import Inbox from "./pages/MainPage/Inbox";
import Outbox from "./pages/MainPage/Outbox";
import Followers from "./pages/MainPage/Followers";
import ActivityPage from "./pages/ActivityPage/ActivityPage";
import Following from "./pages/MainPage/Following";

import theme from "./config/theme";
import i18nProvider from "./config/i18nProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const customPodProviders = import.meta.env.VITE_POD_PROVIDER_DOMAIN_NAME && [
  {
    "apods:domainName": import.meta.env.VITE_POD_PROVIDER_DOMAIN_NAME,
    "apods:area": "Local",
  },
];

const LoginPage = (props) => (
  <PodLoginPage customPodProviders={customPodProviders} {...props} />
);

export const App = () => (
  <BrowserRouter>
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      i18nProvider={i18nProvider}
      queryClient={queryClient}
      layout={Layout}
      loginPage={LoginPage}
      theme={theme}
    >
      <CustomRoutes noLayout>
        <Route path="/" element={<HomePage />} />
      </CustomRoutes>
      <CustomRoutes>
        <Route element={<MainPage />}>
          <Route path="inbox" element={<Inbox />} />
          <Route path="outbox" element={<Outbox />} />
          <Route path="followers" element={<Followers />} />
          <Route path="following" element={<Following />} />
        </Route>
        <Route path="/activity/:activityUri" element={<ActivityPage />} />
        <Route path="/actor/:username" element={<ActorPage />}>
          <Route index element={<ActorPosts />} />
          <Route path="replies" element={<ActorPostsAndReplies />} />
          <Route path="followers" element={<ActorFollowers />} />
          <Route path="following" element={<ActorFollowing />} />
        </Route>
      </CustomRoutes>
      <Resource name="Note" />
      <Resource name="Actor" />
      <Resource name="Profile" />
    </Admin>
  </BrowserRouter>
);
