"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdateimae"]("main_window",{

/***/ "./src/layouts/RootLayout.tsx":
/*!************************************!*\
  !*** ./src/layouts/RootLayout.tsx ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.description = exports.iframeHeight = void 0;\r\nconst react_1 = __importDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\r\nconst react_router_dom_1 = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/dist/index.js\");\r\nconst breadcrumb_1 = __webpack_require__(/*! ../ui/breadcrumb */ \"./src/ui/breadcrumb.tsx\");\r\nconst separator_1 = __webpack_require__(/*! ../ui/separator */ \"./src/ui/separator.tsx\");\r\nconst sidebar_1 = __webpack_require__(/*! ../ui/sidebar */ \"./src/ui/sidebar.tsx\");\r\nconst app_sidebar_1 = __webpack_require__(/*! ../components/sidebar/app-sidebar */ \"./src/components/sidebar/app-sidebar.tsx\");\r\nexports.iframeHeight = \"800px\";\r\nexports.description = \"An inset sidebar with secondary navigation.\";\r\nconst RootLayout = () => {\r\n    return (react_1.default.createElement(react_1.default.Fragment, null,\r\n        react_1.default.createElement(react_router_dom_1.Link, { to: \"expeditions\", className: \"text-sm font-medium transition-colors hover:text-primary\" }, \"expeditions\"),\r\n        react_1.default.createElement(react_router_dom_1.Link, { to: \"auth/login\", className: \"text-sm font-medium transition-colors hover:text-primary\" }, \"login\"),\r\n        react_1.default.createElement(sidebar_1.SidebarProvider, null,\r\n            react_1.default.createElement(app_sidebar_1.AppSidebar, null),\r\n            react_1.default.createElement(sidebar_1.SidebarInset, null,\r\n                react_1.default.createElement(\"header\", { className: \"flex h-16 shrink-0 items-center gap-2\" },\r\n                    react_1.default.createElement(\"div\", { className: \"flex items-center gap-2 px-4\" },\r\n                        react_1.default.createElement(sidebar_1.SidebarTrigger, { className: \"-ml-1\" }),\r\n                        react_1.default.createElement(separator_1.Separator, { orientation: \"vertical\", className: \"mr-2 h-4\" }),\r\n                        react_1.default.createElement(breadcrumb_1.Breadcrumb, null,\r\n                            react_1.default.createElement(breadcrumb_1.BreadcrumbList, null,\r\n                                react_1.default.createElement(breadcrumb_1.BreadcrumbItem, { className: \"hidden md:block\" },\r\n                                    react_1.default.createElement(breadcrumb_1.BreadcrumbLink, { href: \"#\" }, \"Building Your Application\")),\r\n                                react_1.default.createElement(breadcrumb_1.BreadcrumbSeparator, { className: \"hidden md:block\" }),\r\n                                react_1.default.createElement(breadcrumb_1.BreadcrumbItem, null,\r\n                                    react_1.default.createElement(breadcrumb_1.BreadcrumbPage, null, \"Data Fetching\")))))),\r\n                react_1.default.createElement(\"div\", { className: \"flex flex-1 flex-col gap-4 p-4 pt-0\" },\r\n                    react_1.default.createElement(\"div\", { className: \"grid auto-rows-min gap-4 md:grid-cols-3\" },\r\n                        react_1.default.createElement(\"div\", { className: \"aspect-video rounded-xl bg-muted/50\" }),\r\n                        react_1.default.createElement(\"div\", { className: \"aspect-video rounded-xl bg-muted/50\" }),\r\n                        react_1.default.createElement(\"div\", { className: \"aspect-video rounded-xl bg-muted/50\" })),\r\n                    react_1.default.createElement(\"div\", { className: \"min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min\" }))))));\r\n};\r\nexports[\"default\"] = RootLayout;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbGF5b3V0cy9Sb290TGF5b3V0LnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxtR0FBMEI7QUFDMUIsd0hBQTJFO0FBSTNFLDRGQU95QjtBQUN6Qix5RkFBMkM7QUFDM0MsbUZBSXNCO0FBQ3RCLCtIQUE2RDtBQUVoRCxvQkFBWSxHQUFHLE9BQU87QUFFdEIsbUJBQVcsR0FBRyw2Q0FBNkM7QUFHeEUsTUFBTSxVQUFVLEdBQUcsR0FBRyxFQUFFO0lBRXBCLE9BQU8sQ0FDSDtRQUNJLDhCQUFDLHVCQUFJLElBQUMsRUFBRSxFQUFDLGFBQWEsRUFBQyxTQUFTLEVBQUMsMERBQTBELGtCQUVwRjtRQUNQLDhCQUFDLHVCQUFJLElBQUMsRUFBRSxFQUFDLFlBQVksRUFBQyxTQUFTLEVBQUMsMERBQTBELFlBRW5GO1FBQ1AsOEJBQUMseUJBQWU7WUFDWiw4QkFBQyx3QkFBVSxPQUFHO1lBQ2QsOEJBQUMsc0JBQVk7Z0JBQ1QsMENBQVEsU0FBUyxFQUFDLHVDQUF1QztvQkFDckQsdUNBQUssU0FBUyxFQUFDLDhCQUE4Qjt3QkFDekMsOEJBQUMsd0JBQWMsSUFBQyxTQUFTLEVBQUMsT0FBTyxHQUFHO3dCQUNwQyw4QkFBQyxxQkFBUyxJQUFDLFdBQVcsRUFBQyxVQUFVLEVBQUMsU0FBUyxFQUFDLFVBQVUsR0FBRzt3QkFDekQsOEJBQUMsdUJBQVU7NEJBQ1AsOEJBQUMsMkJBQWM7Z0NBQ1gsOEJBQUMsMkJBQWMsSUFBQyxTQUFTLEVBQUMsaUJBQWlCO29DQUN2Qyw4QkFBQywyQkFBYyxJQUFDLElBQUksRUFBQyxHQUFHLGdDQUVQLENBQ0o7Z0NBQ2pCLDhCQUFDLGdDQUFtQixJQUFDLFNBQVMsRUFBQyxpQkFBaUIsR0FBRztnQ0FDbkQsOEJBQUMsMkJBQWM7b0NBQ1gsOEJBQUMsMkJBQWMsd0JBQStCLENBQ2pDLENBQ0osQ0FDUixDQUNYLENBQ0Q7Z0JBQ1QsdUNBQUssU0FBUyxFQUFDLHFDQUFxQztvQkFDaEQsdUNBQUssU0FBUyxFQUFDLHlDQUF5Qzt3QkFDcEQsdUNBQUssU0FBUyxFQUFDLHFDQUFxQyxHQUFHO3dCQUN2RCx1Q0FBSyxTQUFTLEVBQUMscUNBQXFDLEdBQUc7d0JBQ3ZELHVDQUFLLFNBQVMsRUFBQyxxQ0FBcUMsR0FBRyxDQUNyRDtvQkFDTix1Q0FBSyxTQUFTLEVBQUMsMERBQTBELEdBQUcsQ0FDMUUsQ0FDSyxDQUNELENBQ25CLENBQ04sQ0FBQztBQUNOLENBQUM7QUFDRCxxQkFBZSxVQUFVLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pbWFlLy4vc3JjL2xheW91dHMvUm9vdExheW91dC50c3g/NTVjNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7TGluaywgTWVtb3J5Um91dGVyLCBPdXRsZXQsIFJvdXRlLCBSb3V0ZXN9IGZyb20gXCJyZWFjdC1yb3V0ZXItZG9tXCI7XHJcbmltcG9ydCBMb2dpbiBmcm9tIFwiLi4vcGFnZXMvQXV0aC9Mb2dpblwiO1xyXG5pbXBvcnQgRXhwZWRpdGlvbnMgZnJvbSBcIi4uL3BhZ2VzL0V4cGVkaXRpb25zL0V4cGVkaXRpb25zXCI7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgQnJlYWRjcnVtYixcclxuICAgIEJyZWFkY3J1bWJJdGVtLFxyXG4gICAgQnJlYWRjcnVtYkxpbmssXHJcbiAgICBCcmVhZGNydW1iTGlzdCxcclxuICAgIEJyZWFkY3J1bWJQYWdlLFxyXG4gICAgQnJlYWRjcnVtYlNlcGFyYXRvcixcclxufSBmcm9tIFwiLi4vdWkvYnJlYWRjcnVtYlwiXHJcbmltcG9ydCB7IFNlcGFyYXRvciB9IGZyb20gXCIuLi91aS9zZXBhcmF0b3JcIlxyXG5pbXBvcnQge1xyXG4gICAgU2lkZWJhckluc2V0LFxyXG4gICAgU2lkZWJhclByb3ZpZGVyLFxyXG4gICAgU2lkZWJhclRyaWdnZXIsXHJcbn0gZnJvbSBcIi4uL3VpL3NpZGViYXJcIlxyXG5pbXBvcnQge0FwcFNpZGViYXJ9IGZyb20gXCIuLi9jb21wb25lbnRzL3NpZGViYXIvYXBwLXNpZGViYXJcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBpZnJhbWVIZWlnaHQgPSBcIjgwMHB4XCJcclxuXHJcbmV4cG9ydCBjb25zdCBkZXNjcmlwdGlvbiA9IFwiQW4gaW5zZXQgc2lkZWJhciB3aXRoIHNlY29uZGFyeSBuYXZpZ2F0aW9uLlwiXHJcblxyXG5cclxuY29uc3QgUm9vdExheW91dCA9ICgpID0+IHtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDw+XHJcbiAgICAgICAgICAgIDxMaW5rIHRvPVwiZXhwZWRpdGlvbnNcIiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tY29sb3JzIGhvdmVyOnRleHQtcHJpbWFyeVwiID5cclxuICAgICAgICAgICAgICAgIGV4cGVkaXRpb25zXHJcbiAgICAgICAgICAgIDwvTGluaz5cclxuICAgICAgICAgICAgPExpbmsgdG89XCJhdXRoL2xvZ2luXCIgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWNvbG9ycyBob3Zlcjp0ZXh0LXByaW1hcnlcIiA+XHJcbiAgICAgICAgICAgICAgICBsb2dpblxyXG4gICAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgICAgIDxTaWRlYmFyUHJvdmlkZXI+XHJcbiAgICAgICAgICAgICAgICA8QXBwU2lkZWJhciAvPlxyXG4gICAgICAgICAgICAgICAgPFNpZGViYXJJbnNldD5cclxuICAgICAgICAgICAgICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cImZsZXggaC0xNiBzaHJpbmstMCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U2lkZWJhclRyaWdnZXIgY2xhc3NOYW1lPVwiLW1sLTFcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNlcGFyYXRvciBvcmllbnRhdGlvbj1cInZlcnRpY2FsXCIgY2xhc3NOYW1lPVwibXItMiBoLTRcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJyZWFkY3J1bWI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJyZWFkY3J1bWJMaXN0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnJlYWRjcnVtYkl0ZW0gY2xhc3NOYW1lPVwiaGlkZGVuIG1kOmJsb2NrXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnJlYWRjcnVtYkxpbmsgaHJlZj1cIiNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCdWlsZGluZyBZb3VyIEFwcGxpY2F0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0JyZWFkY3J1bWJMaW5rPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0JyZWFkY3J1bWJJdGVtPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnJlYWRjcnVtYlNlcGFyYXRvciBjbGFzc05hbWU9XCJoaWRkZW4gbWQ6YmxvY2tcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnJlYWRjcnVtYkl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QnJlYWRjcnVtYlBhZ2U+RGF0YSBGZXRjaGluZzwvQnJlYWRjcnVtYlBhZ2U+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQnJlYWRjcnVtYkl0ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9CcmVhZGNydW1iTGlzdD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQnJlYWRjcnVtYj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9oZWFkZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtMSBmbGV4LWNvbCBnYXAtNCBwLTQgcHQtMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgYXV0by1yb3dzLW1pbiBnYXAtNCBtZDpncmlkLWNvbHMtM1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhc3BlY3QtdmlkZW8gcm91bmRlZC14bCBiZy1tdXRlZC81MFwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFzcGVjdC12aWRlbyByb3VuZGVkLXhsIGJnLW11dGVkLzUwXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXNwZWN0LXZpZGVvIHJvdW5kZWQteGwgYmctbXV0ZWQvNTBcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtaW4taC1bMTAwdmhdIGZsZXgtMSByb3VuZGVkLXhsIGJnLW11dGVkLzUwIG1kOm1pbi1oLW1pblwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L1NpZGViYXJJbnNldD5cclxuICAgICAgICAgICAgPC9TaWRlYmFyUHJvdmlkZXI+XHJcbiAgICAgICAgPC8+XHJcbiAgICApO1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IFJvb3RMYXlvdXQ7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/layouts/RootLayout.tsx\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("16d9d5913a94968d2b16")
/******/ })();
/******/ 
/******/ }
);