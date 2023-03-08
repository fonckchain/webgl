import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import HomeLayout from "src/layouts/HomeLayout";
// import DashboardLayout from "src/layouts/DashboardLayout";
export const routes = [
  {
    exact: true,
    path: "/",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Home")),
  },
  {
    exact: true,
    path: "/wallet",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Wallet/Index")),
  },
  {
    exact: true,
    path: "/wallet-new",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/WalletNew/Index")),
  },
  {
    exact: true,
    path: "/marketplace-new",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/MarketPlace/Marketplace")),
  },
  {
    exact: true,
    path: "/dealership",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Manufacture/Menufacture")),
  },
  {
    exact: true,
    path: "/race",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Race/Tab")),
  },
  {
    exact: true,
    path: "/exchange-details",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Bankers/BankDetails")),
  },
  // {
  //   exact: true,
  //   path: "/exchange",
  //   layout: HomeLayout,
  //   component: lazy(() => import("src/views/pages/Bankers/Bankers")),
  // },
  {
    exact: true,
    path: "/buy-token",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Mint/Banner")),
  },
  {
    exact: true,
    path: "/create-dealer",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Dealers/CreateDealer")),
  },
  {
    exact: true,
    path: "/dealer-registration",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Dealers/DealerRegistrasion")),
  },
  {
    exact: true,
    path: "/CreateNft",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/NFT/CreateNft")),
  },

  {
    exact: true,
    path: "/details",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Wallet/Details")),
  },
  {
    exact: true,
    path: "/profile",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Profile/Profile")),
  },

  {
    exact: true,
    path: "/race",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Race/Tab")),
  },

  {
    exact: true,
    layout: HomeLayout,
    path: "/marketplace_old",
    component: lazy(() => import("src/views/pages/Home/Marketplace")),
  },
  {
    exact: true,
    layout: HomeLayout,
    path: "/our-community",
    component: lazy(() => import("src/views/pages/Home/OurCommunity")),
  },
  {
    exact: true,
    layout: HomeLayout,
    path: "/marketplace",
    component: lazy(() => import("src/views/pages/Dealers/Dealers")),
  },
  {
    exact: true,
    layout: HomeLayout,
    path: "/dealer-details",
    component: lazy(() => import("src/views/pages/Dealers/DealerDetails")),
  },
  // {
  //   exact: true,
  //   path: '/cardetails',
  //   layout: HomeLayout,
  //   component: lazy(() => import('src/views/pages/Home/CarDetails')),
  // },
  {
    exact: true,
    path: "/ownNftDetails",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/CarDetails/OwnNFTdetails")),
  },
  {
    exact: true,
    path: "/cardetails",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/CarDetails/index")),
  },
  {
    exact: true,
    path: "/dealers-details",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/CarDetails/DealersIndex")),
  },
  {
    exact: true,
    path: "/card",
    layout: HomeLayout,
    component: lazy(() => import("src/component/ParticipateCard")),
  },
  {
    exact: true,
    path: "/profile",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Profile/Profile")),
  },
  {
    exact: true,
    path: "/edit-profile",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Profile/EditProfile")),
  },
  {
    //   exact: true,

    path: "/racefeatures",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Home/RaceFeatures")),
  },
  {
    //   exact: true,

    path: "/racefeatures",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Home/RaceFeatures")),
  },
  // {
  //   exact: true,

  //   path: "/publicmint",
  //   layout: HomeLayout,
  //   component: lazy(() => import("src/component/PublicMint")),
  // },
  {
    exact: true,

    path: "/brackers",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Home/Brackers")),
  },
  {
    exact: true,

    path: "/roadmap",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Home/RoadMap")),
  },
  {
    exact: true,

    path: "/faq",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/HelpCenter/index")),
  },
  {
    exact: true,

    path: "/notification",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Notification/Notification")),
  },
  {
    exact: true,

    path: "/teambehind",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Home/TeamBehind")),
  },
  {
    exact: true,

    path: "/learnmore",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/HelpCenter/LearnMore")),
  },
  {
    exact: true,

    path: "/bolt-delership",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Dealers/BoltDelership")),
  },
  {
    exact: true,

    path: "/upcommingn-races",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Home/UpcomingRaces")),
  },
  {
    exact: true,

    path: "/racingResult",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/RacingResult")),
  },

  {
    exact: true,

    path: "/race-details",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/RaceDetails/index")),
  },
  {
    exact: true,
    path: "/black-marketplace",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/BlackMarketPlace")),
  },
  {
    exact: true,
    path: "/privacy-policy",
    layout: HomeLayout,
    component: lazy(() => import("src/component/PrivacyPolicy")),
  },

  {
    exact: true,
    path: "/black-market-details",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Home/CarDetails")),
  },

  {
    exact: true,

    path: "/learn-more",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/LearnMore/LearnMore")),
  },
  {
    exact: true,

    path: "/boltleadership",
    layout: HomeLayout,
    component: lazy(() =>
      import("src/views/pages/BoltLeadership/BoltLeadership")
    ),
  },
  {
    exact: true,
    path: "/marketplace-detail",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/MarketplaceDetail/index")),
  },

  {
    exact: true,
    path: "/exchange",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Exchanges/Echanges")),
  },

  {
    exact: true,
    path: "/404",
    component: lazy(() => import("src/views/errors/NotFound")),
  },
  {
    component: () => <Redirect to="/404" />,
  },
];
