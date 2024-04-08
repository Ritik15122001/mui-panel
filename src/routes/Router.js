import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import Loadable from '../layouts/full/shared/loadable/Loadable';
import AddBlog from '../views/apps/blog/AddBlog';
import AddServices from '../views/apps/services/AddServices';
import AddHome from '../views/apps/home/AddHome';
import ViewServices from '../views/apps/services/ViewServices';
import AddWork from '../views/apps/Work/AddWork';

import AddAbout from '../views/apps/about/AddAbout';
import ViewAbout from '../views/apps/about/ViewAbout';
import ViewHome from '../views/apps/home/ViewHome';
import AddContact from '../views/apps/contacts/AddContact';
import ViewContact from '../views/apps/contacts/ViewContact';
import AddTeam from '../views/apps/team/AddTeam';
import ViewTeam from '../views/apps/team/ViewTeam';
import AddTestimonial from '../views/apps/testimonial/AddTestimonial';
import ViewTestimonial from '../views/apps/testimonial/ViewTestimonial';
import Modern from '../views/dashboard/Modern';
import UpdateContact from '../components/apps/contacts/UpdateContact';
import ViewWork from '../views/apps/work/ViewWork';
import PreviewContact from '../components/apps/contacts/PreviewContact';
import UpdateAbout from '../components/apps/about/UpdateAbout';
import PreviewAbout from '../components/apps/about/PreviewAbout';
import PreviewBlog from '../components/apps/blog/PreviewBlog';
import UpdateBlog from '../components/apps/blog/UpdateBlog';
import PreviewServices from '../components/apps/services/PreviewServices';
import UpdateServices from '../components/apps/services/UpdateServices';
import PreviewHome from '../components/apps/home/PreviewHome';
import UpdateHome from '../components/apps/home/UpdateHome';
import PreviewWork from '../components/apps/work/PreviewWork';
import UpdateWork from '../components/apps/work/UpdateWork';
import UpdateTestimonial from '../components/apps/testimonial/UpdateTestimonial';
import PreviewTestimonial from '../components/apps/testimonial/PreviewTestimonial';
import UpdateTeam from '../components/apps/team/UpdateTeam';
import PreviewTeam from '../components/apps/team/PreviewTeam';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const ModernDash = Loadable(lazy(() => import('../views/dashboard/Modern')));
const EcommerceDash = Loadable(lazy(() => import('../views/dashboard/Ecommerce')));

/* ****Apps***** */
const Chats = Loadable(lazy(() => import('../views/apps/chat/Chat')));
const Notes = Loadable(lazy(() => import('../views/apps/notes/Notes')));
const Calendar = Loadable(lazy(() => import('../views/apps/calendar/BigCalendar')));
const Email = Loadable(lazy(() => import('../views/apps/email/Email')));
const Blog = Loadable(lazy(() => import('../views/apps/blog/Blog')));
const BlogDetail = Loadable(lazy(() => import('../views/apps/blog/BlogPost')));
const Tickets = Loadable(lazy(() => import('../views/apps/tickets/Tickets')));
const Contacts = Loadable(lazy(() => import('../views/apps/contacts/Contacts')));
const Ecommerce = Loadable(lazy(() => import('../views/apps/eCommerce/Ecommerce')));
const EcommerceDetail = Loadable(lazy(() => import('../views/apps/eCommerce/EcommerceDetail')));
const EcomProductList = Loadable(lazy(() => import('../views/apps/eCommerce/EcomProductList')));
const EcomProductCheckout = Loadable(
  lazy(() => import('../views/apps/eCommerce/EcommerceCheckout')),
);
const UserProfile = Loadable(lazy(() => import('../views/apps/user-profile/UserProfile')));
const Followers = Loadable(lazy(() => import('../views/apps/user-profile/Followers')));
const Friends = Loadable(lazy(() => import('../views/apps/user-profile/Friends')));
const Gallery = Loadable(lazy(() => import('../views/apps/user-profile/Gallery')));

// Pages
const RollbaseCASL = Loadable(lazy(() => import('../views/pages/rollbaseCASL/RollbaseCASL')));
const Treeview = Loadable(lazy(() => import('../views/pages/treeview/Treeview')));
const Pricing = Loadable(lazy(() => import('../views/pages/pricing/Pricing')));
const AccountSetting = Loadable(
  lazy(() => import('../views/pages/account-setting/AccountSetting')),
);
const Faq = Loadable(lazy(() => import('../views/pages/faq/Faq')));

// widget
const WidgetCards = Loadable(lazy(() => import('../views/widgets/cards/WidgetCards')));
const WidgetBanners = Loadable(lazy(() => import('../views/widgets/banners/WidgetBanners')));
const WidgetCharts = Loadable(lazy(() => import('../views/widgets/charts/WidgetCharts')));

// form elements
const MuiAutoComplete = Loadable(
  lazy(() => import('../views/forms/form-elements/MuiAutoComplete')),
);
const MuiButton = Loadable(lazy(() => import('../views/forms/form-elements/MuiButton')));
const MuiCheckbox = Loadable(lazy(() => import('../views/forms/form-elements/MuiCheckbox')));
const MuiRadio = Loadable(lazy(() => import('../views/forms/form-elements/MuiRadio')));
const MuiSlider = Loadable(lazy(() => import('../views/forms/form-elements/MuiSlider')));
const MuiDateTime = Loadable(lazy(() => import('../views/forms/form-elements/MuiDateTime')));
const MuiSwitch = Loadable(lazy(() => import('../views/forms/form-elements/MuiSwitch')));

// form layout
const FormLayouts = Loadable(lazy(() => import('../views/forms/FormLayouts')));
const FormCustom = Loadable(lazy(() => import('../views/forms/FormCustom')));
const FormWizard = Loadable(lazy(() => import('../views/forms/FormWizard')));
const FormValidation = Loadable(lazy(() => import('../views/forms/FormValidation')));
const QuillEditor = Loadable(lazy(() => import('../views/forms/quill-editor/QuillEditor')));
const FormHorizontal = Loadable(lazy(() => import('../views/forms/FormHorizontal')));
const FormVertical = Loadable(lazy(() => import('../views/forms/FormVertical')));

// tables
const BasicTable = Loadable(lazy(() => import('../views/tables/BasicTable')));
const CollapsibleTable = Loadable(lazy(() => import('../views/tables/CollapsibleTable')));
const EnhancedTable = Loadable(lazy(() => import('../views/tables/EnhancedTable')));
const FixedHeaderTable = Loadable(lazy(() => import('../views/tables/FixedHeaderTable')));
const PaginationTable = Loadable(lazy(() => import('../views/tables/PaginationTable')));
const SearchTable = Loadable(lazy(() => import('../views/tables/SearchTable')));

// chart
const LineChart = Loadable(lazy(() => import('../views/charts/LineChart')));
const GredientChart = Loadable(lazy(() => import('../views/charts/GredientChart')));
const DoughnutChart = Loadable(lazy(() => import('../views/charts/DoughnutChart')));
const AreaChart = Loadable(lazy(() => import('../views/charts/AreaChart')));
const ColumnChart = Loadable(lazy(() => import('../views/charts/ColumnChart')));
const CandlestickChart = Loadable(lazy(() => import('../views/charts/CandlestickChart')));
const RadialbarChart = Loadable(lazy(() => import('../views/charts/RadialbarChart')));

// ui
const MuiAlert = Loadable(lazy(() => import('../views/ui-components/MuiAlert')));
const MuiAccordion = Loadable(lazy(() => import('../views/ui-components/MuiAccordion')));
const MuiAvatar = Loadable(lazy(() => import('../views/ui-components/MuiAvatar')));
const MuiChip = Loadable(lazy(() => import('../views/ui-components/MuiChip')));
const MuiDialog = Loadable(lazy(() => import('../views/ui-components/MuiDialog')));
const MuiList = Loadable(lazy(() => import('../views/ui-components/MuiList')));
const MuiPopover = Loadable(lazy(() => import('../views/ui-components/MuiPopover')));
const MuiRating = Loadable(lazy(() => import('../views/ui-components/MuiRating')));
const MuiTabs = Loadable(lazy(() => import('../views/ui-components/MuiTabs')));
const MuiTooltip = Loadable(lazy(() => import('../views/ui-components/MuiTooltip')));
const MuiTransferList = Loadable(lazy(() => import('../views/ui-components/MuiTransferList')));
const MuiTypography = Loadable(lazy(() => import('../views/ui-components/MuiTypography')));

// authentication
const Login = Loadable(lazy(() => import('../views/authentication/auth1/Login')));
const Login2 = Loadable(lazy(() => import('../views/authentication/auth2/Login2')));
const Register = Loadable(lazy(() => import('../views/authentication/auth1/Register')));
const Register2 = Loadable(lazy(() => import('../views/authentication/auth2/Register2')));
const ForgotPassword = Loadable(lazy(() => import('../views/authentication/auth1/ForgotPassword')));
const ForgotPassword2 = Loadable(
  lazy(() => import('../views/authentication/auth2/ForgotPassword2')),
);
const TwoSteps = Loadable(lazy(() => import('../views/authentication/auth1/TwoSteps')));
const TwoSteps2 = Loadable(lazy(() => import('../views/authentication/auth2/TwoSteps2')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Maintenance = Loadable(lazy(() => import('../views/authentication/Maintenance')));

// landingpage
const Landingpage = Loadable(lazy(() => import('../views/pages/landingpage/Landingpage')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      // { path: '/dashboard', element: <Navigate to="/dashboards/modern" /> },
      { path: '/dashboard', element: <Modern /> },
      { path: '/', element: <Navigate to="/auth/login" /> },
      // { path: '/dashboards/modern', exact: true, element: <ModernDash /> },
      // { path: '/dashboards/ecommerce', exact: true, element: <EcommerceDash /> },
      // { path: '/apps/chats', element: <Chats /> },
      // { path: '/apps/notes', element: <Notes /> },
      // { path: '/apps/calendar', element: <Calendar /> },
      // { path: '/apps/email', element: <Email /> },
      // { path: '/apps/tickets', element: <Tickets /> },
      // { path: '/apps/contacts', element: <Contacts /> },
      { path: '/apps/contacts/add', element: <AddContact /> },
      { path: '/apps/contacts/view', element: <ViewContact /> },
      { path: '/apps/contacts/update', element: <UpdateContact /> },
      { path: '/apps/contacts/preview', element: <PreviewContact /> },
      // { path: '/apps/ecommerce/shop', element: <Ecommerce /> },
      { path: '/apps/home/add', element: <AddHome /> },
      { path: '/apps/home/view', element: <ViewHome /> },
      { path: '/apps/home/preview/:id', element: <PreviewHome /> },
      { path: '/apps/home/update/:id', element: <UpdateHome /> },
      { path: '/apps/blog/add', element: <AddBlog /> },
      { path: '/apps/blog/posts', element: <Blog /> },
      { path: '/apps/blog/preview', element: <PreviewBlog /> },
      { path: '/apps/blog/update', element: <UpdateBlog /> },
      // { path: '/apps/blog/posts', element: <Blog /> },
      { path: '/apps/blog/detail/:id', element: <BlogDetail /> },
      { path: '/apps/services/add', element: <AddServices /> },
      { path: '/apps/services/view', element: <ViewServices /> },
      { path: '/apps/services/preview', element: <PreviewServices /> },
      { path: '/apps/services/update', element: <UpdateServices /> },
      { path: '/apps/work/add', element: <AddWork /> },
      { path: '/apps/work/view', element: <ViewWork /> },
      { path: '/apps/work/preview', element: <PreviewWork /> },
      { path: '/apps/work/update', element: <UpdateWork /> },
      { path: '/apps/about/add', element: <AddAbout /> },
      { path: '/apps/about/view', element: <ViewAbout /> },
      { path: '/apps/about/update', element: <UpdateAbout /> },
      { path: '/apps/about/preview', element: <PreviewAbout /> },
      { path: '/apps/team/add', element: <AddTeam /> },
      { path: '/apps/team/view', element: <ViewTeam /> },
      { path: '/apps/team/preview', element: <PreviewTeam /> },
      { path: '/apps/team/update', element: <UpdateTeam /> },
      { path: '/apps/testimonial/add', element: <AddTestimonial /> },
      { path: '/apps/testimonial/view', element: <ViewTestimonial /> },
      { path: '/apps/testimonial/preview', element: <PreviewTestimonial /> },
      { path: '/apps/testimonial/update', element: <UpdateTestimonial /> },
      // { path: '/apps/ecommerce/eco-product-list', element: <EcomProductList /> },
      // { path: '/apps/ecommerce/eco-checkout', element: <EcomProductCheckout /> },
      // { path: '/apps/ecommerce/detail/:id', element: <EcommerceDetail /> },
      // { path: '/apps/followers', element: <Followers /> },
      // { path: '/apps/friends', element: <Friends /> },
      // { path: '/apps/gallery', element: <Gallery /> },
      // { path: '/user-profile', element: <UserProfile /> },
      // { path: '/pages/casl', element: <RollbaseCASL /> },
      // { path: '/pages/treeview', element: <Treeview /> },
      // { path: '/pages/pricing', element: <Pricing /> },
      // { path: '/pages/account-settings', element: <AccountSetting /> },
      // { path: '/pages/faq', element: <Faq /> },
      // { path: '/forms/form-elements/autocomplete', element: <MuiAutoComplete /> },
      // { path: '/forms/form-elements/button', element: <MuiButton /> },
      // { path: '/forms/form-elements/checkbox', element: <MuiCheckbox /> },
      // { path: '/forms/form-elements/radio', element: <MuiRadio /> },
      // { path: '/forms/form-elements/slider', element: <MuiSlider /> },
      // { path: '/forms/form-elements/date-time', element: <MuiDateTime /> },
      // { path: '/forms/form-elements/switch', element: <MuiSwitch /> },
      // { path: '/forms/form-elements/switch', element: <MuiSwitch /> },
      // { path: '/forms/quill-editor', element: <QuillEditor /> },
      // { path: '/forms/form-layouts', element: <FormLayouts /> },
      // { path: '/forms/form-horizontal', element: <FormHorizontal /> },
      // { path: '/forms/form-vertical', element: <FormVertical /> },
      // { path: '/forms/form-custom', element: <FormCustom /> },
      // { path: '/forms/form-wizard', element: <FormWizard /> },
      // { path: '/forms/form-validation', element: <FormValidation /> },
      // { path: '/tables/basic', element: <BasicTable /> },
      // { path: '/tables/collapsible', element: <CollapsibleTable /> },
      // { path: '/tables/enhanced', element: <EnhancedTable /> },
      // { path: '/tables/fixed-header', element: <FixedHeaderTable /> },
      // { path: '/tables/pagination', element: <PaginationTable /> },
      // { path: '/tables/search', element: <SearchTable /> },
      // { path: '/charts/line-chart', element: <LineChart /> },
      // { path: '/charts/gredient-chart', element: <GredientChart /> },
      // { path: '/charts/doughnut-pie-chart', element: <DoughnutChart /> },
      // { path: '/charts/area-chart', element: <AreaChart /> },
      // { path: '/charts/column-chart', element: <ColumnChart /> },
      // { path: '/charts/candlestick-chart', element: <CandlestickChart /> },
      // { path: '/charts/radialbar-chart', element: <RadialbarChart /> },
      // { path: '/ui-components/alert', element: <MuiAlert /> },
      // { path: '/ui-components/accordion', element: <MuiAccordion /> },
      // { path: '/ui-components/avatar', element: <MuiAvatar /> },
      // { path: '/ui-components/chip', element: <MuiChip /> },
      // { path: '/ui-components/dialog', element: <MuiDialog /> },
      // { path: '/ui-components/list', element: <MuiList /> },
      // { path: '/ui-components/popover', element: <MuiPopover /> },
      // { path: '/ui-components/rating', element: <MuiRating /> },
      // { path: '/ui-components/tabs', element: <MuiTabs /> },
      // { path: '/ui-components/tooltip', element: <MuiTooltip /> },
      // { path: '/ui-components/transfer-list', element: <MuiTransferList /> },
      // { path: '/ui-components/typography', element: <MuiTypography /> },
      // { path: '/widgets/cards', element: <WidgetCards /> },
      // { path: '/widgets/banners', element: <WidgetBanners /> },
      // { path: '/widgets/charts', element: <WidgetCharts /> },

      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      //     { path: '/auth/404', element: <Error /> },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/login2', element: <Login2 /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/register2', element: <Register2 /> },
      { path: '/auth/forgot-password', element: <ForgotPassword /> },
      { path: '/auth/forgot-password2', element: <ForgotPassword2 /> },
      { path: '/auth/two-steps', element: <TwoSteps /> },
      { path: '/auth/two-steps2', element: <TwoSteps2 /> },
      { path: '/auth/maintenance', element: <Maintenance /> },
      { path: '/landingpage', element: <Landingpage /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
