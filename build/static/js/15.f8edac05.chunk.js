(window["webpackJsonpbk-erp-front"]=window["webpackJsonpbk-erp-front"]||[]).push([[15],{1596:function(e,t,a){},1597:function(e,t,a){},1619:function(e,t,a){},1746:function(e,t,a){"use strict";a.r(t);a(223);var n=a(224),o=(a(229),a(230)),s=(a(238),a(239)),r=(a(231),a(232)),i=(a(278),a(276)),c=(a(272),a(269)),l=(a(289),a(288)),m=(a(286),a(282)),d=(a(228),a(227)),p=(a(234),a(18)),u=(a(280),a(281)),h=a(257),f=a(33),g=a(96),b=a(97),y=a(100),E=a(98),v=a(44),A=a(99),O=(a(250),a(251)),C=(a(138),a(101)),T=a(0),L=a.n(T),k=a(64),D=a.n(k),j=(a(1596),a(1597),a(857)),S=a.n(j),w=a(864),H=a.n(w),_=a(902),F=a(2),x=(a(1619),a(24)),P=a(65),I=a(475),R=a(23),M=a(32),Y=(a(343),a(357)),N=a(581),z=function(e){function t(e){return Object(g.a)(this,t),Object(y.a)(this,Object(E.a)(t).call(this,e))}return Object(A.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){return L.a.createElement(Y.a,{placement:"right",content:L.a.createElement(N.a,Object.assign({appointmentId:this.props.event.appointment.id,key:this.props.event.appointment.id},this.props)),trigger:"hover"},L.a.createElement("div",{style:{color:"white",height:"100%"}},L.a.createElement("h1",{style:{color:"white"}},L.a.createElement(p.a,{type:"user"}),this.props.title)))}}]),t}(L.a.Component),G=a(249),B=a(3);function W(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function V(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?W(a,!0).forEach((function(t){Object(f.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):W(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var J=L.a.createElement(m.a,null,L.a.createElement(m.a.Item,{key:"1"},L.a.createElement(P.b,{to:"/settings/calendarsettings#timings"},"Modify Calendar Timings")),L.a.createElement(m.a.Item,{key:"2"},L.a.createElement(P.b,{to:"/settings/clinics-staff#staff"},"Add/Edit Doctor or Staff")),L.a.createElement(m.a.Item,{key:"3"},L.a.createElement(P.b,{to:"/settings/clinics-staff#notification"},"Modify SMS/Email for Doctor/Staff")),L.a.createElement(m.a.Item,{key:"4"},L.a.createElement(P.b,{to:"/settings/communication-settings"},"Modify SMS/Email for Patients")),L.a.createElement(m.a.Item,{key:"5"},L.a.createElement(P.b,{to:"/settings/calendarsettings#categories"},"Add/Edit Categroies"))),K=function(e,t){var a=B.get(F.v);a||(a={}),a=V({},a,Object(f.a)({},e,t)),B.set(F.v,a)},q=function(){var e=B.get(F.v);return e||(e={}),e},U=function(e){var t=!0,a=D()(e.value).isValid()?D()(e.value).format("dddd").toLowerCase():null;if("DOCTOR"!=e.filterType||"ALL"==e.selectedDoctor)if(e.calendarTimings&&a&&e.calendarTimings[a]){var n=e.calendarTimings[a];n.lunch?(D()(e.value,"HH:mm:ss").format("HH:mm:ss")<=n.startTime.format("HH:mm:ss")||D()(e.value,"HH:mm:ss").format("HH:mm:ss")>n.endTime.format("HH:mm:ss")||D()(e.value,"HH:mm:ss").format("HH:mm:ss")<n.lunchEndTime.format("HH:mm:ss")&&D()(e.value,"HH:mm:ss").format("HH:mm:ss")>=n.lunchStartTime.format("HH:mm:ss"))&&(t=!1):(D()(e.value,"HH:mm:ss").format("HH:mm:ss")<=n.startTime.format("HH:mm:ss")||D()(e.value,"HH:mm:ss").format("HH:mm:ss")>n.endTime.format("HH:mm:ss"))&&(t=!1)}else a&&!e.calendarTimings[a]&&(t=!1);else if(e.doctorTimings&&a&&e.doctorTimings[a]){var o=e.doctorTimings[a];o.lunch?(D()(e.value,"HH:mm:ss").format("HH:mm:ss")<=o.startTime.format("HH:mm:ss")||D()(e.value,"HH:mm:ss").format("HH:mm:ss")>o.endTime.format("HH:mm:ss")||D()(e.value,"HH:mm:ss").format("HH:mm:ss")<o.lunchEndTime.format("HH:mm:ss")&&D()(e.value,"HH:mm:ss").format("HH:mm:ss")>=o.lunchStartTime.format("HH:mm:ss"))&&(t=!1):(D()(e.value,"HH:mm:ss").format("HH:mm:ss")<=o.startTime.format("HH:mm:ss")||D()(e.value,"HH:mm:ss").format("HH:mm:ss")>o.endTime.format("HH:mm:ss"))&&(t=!1)}else e.doctorTimings&&a&&!e.doctorTimings[a]&&(t=!1);if(e.showCalendarEvents&&t)for(var s=0;s<e.blockedCalendar.length;s++)if(e.blockedCalendar[s].doctor&&"DOCTOR"==e.filterType){if(e.blockedCalendar[s].doctor==e.selectedDoctor&&D()(e.value).isBetween(D()(e.blockedCalendar[s].block_from),D()(e.blockedCalendar[s].block_to))){t=!1;break}}else if(D()(e.value).isBetween(D()(e.blockedCalendar[s].block_from),D()(e.blockedCalendar[s].block_to))){t=!1;break}if(t)return e.children;var r=L.a.Children.only(e.children);return L.a.cloneElement(r,{className:r.props.className+" rbc-off-range-bg"})},X=(a(267),a(270)),Q=a(244),Z=function(e){function t(e){var a;return Object(g.a)(this,t),(a=Object(y.a)(this,Object(E.a)(t).call(this,e))).changeDate=function(e){var t=Object(v.a)(a);a.setState((function(t){return e?{selectedDate:t.selectedDate.add(1,"days")}:{selectedDate:t.selectedDate.subtract(1,"days")}}),(function(){t.todaysAppointments()}))},a.todaysAppointments=function(){var e=Object(v.a)(a);e.setState({loading:!0});Object(R.b)(Object(R.e)(M.q,[a.props.active_practiceId]),(function(t){e.setState((function(e){var a={},n=[];return t.forEach((function(t){if(t.status==Q.m)return!0;a[t.status]?a[t.status]+=1:a[t.status]=1,"ALL"==e.todaysAppointmentFilter?n.push(t):e.todaysAppointmentFilter==t.status&&n.push(t)})),{todaysAppointments:t,todaysAppointmentOverview:a,todaysFilteredAppointments:n,loading:!1}}))}),(function(){e.setState({loading:!1})}),{start:e.state.selectedDate.format("YYYY-MM-DD"),end:e.state.selectedDate.format("YYYY-MM-DD")})},a.filterTodaysAppointment=function(e){a.setState((function(t){var a=[];return t.todaysAppointments.forEach((function(t){"ALL"==e?a.push(t):e==t.status&&a.push(t)})),{todaysFilteredAppointments:a,todaysAppointmentFilter:e}}))},a.changeAppointmentStatus=function(e,t,n){var o=Object(v.a)(a);Object(R.b)(Object(R.e)(M.o,[e]),(function(a){a.status==t?o.updateAppointmentStatus(e,t,n):(Object(R.a)(F.S,"Appointment status has already changed. Updating Appointments..."),o.todaysAppointments())}),(function(){}))},a.updateAppointmentStatus=function(e,t,n){var o=Object(v.a)(a),s={status:n};n==Q.Fb?s.waiting=D()().format():n==Q.F?s.engaged=D()().format():n==Q.n&&(s.checkout=D()().format());Object(R.k)(Object(R.e)(M.o,[e]),s,(function(e){Object(R.a)(F.Wb,"Appointment Status Changed Successfully!!"),o.todaysAppointments()}),(function(){}))},a.state={todaysAppointments:[],todaysFilteredAppointments:[],todaysAppointmentOverview:{},todaysAppointmentFilter:"ALL",selectedDate:D()()},a.todaysAppointments=a.todaysAppointments.bind(Object(v.a)(a)),a}return Object(A.a)(t,e),Object(b.a)(t,[{key:"componentDidMount",value:function(){this.todaysAppointments()}},{key:"render",value:function(){var e=this,t=this;return L.a.createElement("div",null,L.a.createElement(l.a,{trigger:"click",overlay:J},L.a.createElement(d.a,{block:!0,style:{margin:5}},L.a.createElement(p.a,{type:"setting"})," Settings ",L.a.createElement(p.a,{type:"down"}))),t.props.activePracticePermissions.AddWalkinAppointment||t.props.allowAllPermissions?L.a.createElement(P.b,{to:"/calendar/create-appointment"},L.a.createElement(d.a,{block:!0,type:"primary",style:{margin:5}}," Walkin Appointment")):null,L.a.createElement(n.a,{gutter:8},L.a.createElement(o.a,{span:6,onClick:function(){return e.filterTodaysAppointment(e.state.todaysAppointmentFilter==Q.Ab?"ALL":Q.Ab)},style:{textAlign:"center",border:"1px solid #ccc",borderRadius:"3px",backgroundColor:this.state.todaysAppointmentFilter==Q.Ab?"#FF6600":null,color:this.state.todaysAppointmentFilter==Q.Ab?"white":"#FF6600",boxShadow:"0 2px 4px #111 inset"}},L.a.createElement("small",null,Q.Ab),L.a.createElement("h2",{style:{color:this.state.todaysAppointmentFilter==Q.Ab?"white":"#FF6600"}},this.state.todaysAppointmentOverview[Q.Ab]?this.state.todaysAppointmentOverview[Q.Ab]:0)),L.a.createElement(o.a,{span:6,onClick:function(){return e.filterTodaysAppointment(e.state.todaysAppointmentFilter==Q.Fb?"ALL":Q.Fb)},style:{textAlign:"center",border:"1px solid #ccc",borderRadius:"3px",backgroundColor:this.state.todaysAppointmentFilter==Q.Fb?"#FC0000":null,color:this.state.todaysAppointmentFilter==Q.Fb?"white":"#FC0000",boxShadow:"0 2px 4px #111 inset"}},L.a.createElement("small",null,Q.Fb),L.a.createElement("h2",{style:{color:this.state.todaysAppointmentFilter==Q.Fb?"white":"#FC0000"}},this.state.todaysAppointmentOverview[Q.Fb]?this.state.todaysAppointmentOverview[Q.Fb]:0)),L.a.createElement(o.a,{span:6,onClick:function(){return e.filterTodaysAppointment(e.state.todaysAppointmentFilter==Q.F?"ALL":Q.F)},style:{textAlign:"center",border:"1px solid #ccc",borderRadius:"3px",backgroundColor:this.state.todaysAppointmentFilter==Q.F?"#598C01":null,color:this.state.todaysAppointmentFilter==Q.F?"white":"#598C01",boxShadow:"0 2px 4px #111 inset"}},L.a.createElement("small",null,Q.F),L.a.createElement("h2",{style:{color:this.state.todaysAppointmentFilter==Q.F?"white":"#598C01"}},this.state.todaysAppointmentOverview[Q.F]?this.state.todaysAppointmentOverview[Q.F]:0)),L.a.createElement(o.a,{span:6,onClick:function(){return e.filterTodaysAppointment(e.state.todaysAppointmentFilter==Q.n?"ALL":Q.n)},style:{textAlign:"center",border:"1px solid #ccc",borderRadius:"3px",backgroundColor:this.state.todaysAppointmentFilter==Q.n?"#0094DE":null,color:this.state.todaysAppointmentFilter==Q.n?"white":"#0094DE",boxShadow:"0 2px 4px #111 inset"}},L.a.createElement("small",null,Q.n),L.a.createElement("h2",{style:{color:this.state.todaysAppointmentFilter==Q.n?"white":"#0094DE"}},this.state.todaysAppointmentOverview[Q.n]?this.state.todaysAppointmentOverview[Q.n]:0))),L.a.createElement(r.a,null,L.a.createElement("a",{type:"primary",onClick:function(){return e.changeDate(!1)}},L.a.createElement(p.a,{type:"left"})),this.state.selectedDate.format("MMM Do")==D()().format("MMM Do")?"Today":this.state.selectedDate.format("MMM Do"),"'s Schedule (",this.state.todaysFilteredAppointments.length,") \xa0",L.a.createElement("a",{type:"primary",onClick:function(){return e.changeDate(!0)}},L.a.createElement(p.a,{type:"right"}))),L.a.createElement(s.a,{spinning:this.state.loading},L.a.createElement(X.a,{size:"small",dataSource:this.state.todaysFilteredAppointments,renderItem:function(a){return a.status==Q.m?L.a.createElement("div",null):L.a.createElement(X.a.Item,{color:"transparent",style:{padding:0}},L.a.createElement("div",{style:{border:"1px solid #ddd",borderRadius:"5px",textDecoration:a.status==Q.m?"line-through":"inherit",backgroundColor:a.status==Q.m?"#aaa":"#eee",width:"100%",marginTop:"2px",borderLeft:"5px solid"+(a.doctor&&t.props.doctors_object&&t.props.doctors_object[a.doctor]?t.props.doctors_object[a.doctor].calendar_colour:"transparent")}},L.a.createElement($,Object.assign({},a,{changeAppointmentStatus:e.changeAppointmentStatus},e.props))))}})))}}]),t}(L.a.Component);function $(e){return L.a.createElement("div",{style:{width:"100%"}},L.a.createElement("p",{style:{marginBottom:0}},L.a.createElement(Y.a,{placement:"right",content:L.a.createElement(N.a,Object.assign({appointmentId:e.id,key:e.id},e))},L.a.createElement("span",{style:{width:"calc(100% - 60px)"}},L.a.createElement("b",null,D()(e.schedule_at).format("LT")),"\xa0",e.patient.user.first_name)),e.status==Q.Ab?L.a.createElement("span",{style:{width:"70px",float:"right"}},L.a.createElement("a",{onClick:function(){return e.changeAppointmentStatus(e.id,Q.Ab,Q.Fb)},disabled:!e.activePracticePermissions.ChangeAppointmentStatus}," Check In")):null,e.status==Q.Fb?L.a.createElement("span",{style:{width:"70px",float:"right"}},L.a.createElement("a",{onClick:function(){return e.changeAppointmentStatus(e.id,Q.Fb,Q.F)},disabled:!e.activePracticePermissions.ChangeAppointmentStatus}," Engage")):null,e.status==Q.F?L.a.createElement("span",{style:{width:"70px",float:"right"}},L.a.createElement("a",{onClick:function(){return e.changeAppointmentStatus(e.id,Q.F,Q.n)},disabled:!e.activePracticePermissions.ChangeAppointmentStatus}," Check Out")):null,e.status==Q.n?L.a.createElement("span",{style:{width:"70px",float:"right"}},L.a.createElement("small",null,"Checked Out")):null))}function ee(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function te(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?ee(a,!0).forEach((function(t){Object(f.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):ee(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var ae=Object(_.c)(D.a),ne=S()(_.a),oe=C.a.Content,se=O.a.confirm,re=function(e){function t(e){var a;return Object(g.a)(this,t),(a=Object(y.a)(this,Object(E.a)(t).call(this,e))).changeCalendarType=function(e){var t=Object(v.a)(a);a.setState({calendarType:e,selectedDoctor:"ALL",selectedCategory:"ALL",filterType:"DOCTOR"},(function(){"APPOINTMENTS"==e?t.changeFilter("selectedDoctor","ALL"):"AVAILABILITY"==e&&t.state.practice_doctors.length&&t.changeFilter("selectedDoctor",t.state.practice_doctors[0].id)}))},a.resizeEvent=function(e){var t=e.event,n=e.start,o=e.end;if(t.appointment.status!=Q.Ab)return Object(R.a)(F.fc,"Action Not Allowed"),!0;var s=a.state.events,r={},i=Object(v.a)(a),c=[];s.forEach((function(e){e.id==t.id&&(r={schedule_at:D()(n).format(),slot:parseInt((o-n)/6e4)})}));var l=function(e){Object(R.a)(F.Wb,"time changed"),s.forEach((function(e){c.push(e.id==t.id?te({},e,{start:n,end:o}):e)})),i.setState({events:c},(function(){i.refreshFilterList()}))},m=function(){};se({title:"Are you sure to change the time of this appointment?",onOk:function(){Object(R.k)(Object(R.e)(M.o,[t.id]),r,l,m)},onCancel:function(){console.log("Cancel")}})},a.blockedCalendarTiming=function(e,t){var n=Object(v.a)(a);Object(R.b)(M.x,(function(e){n.setState({blockedCalendar:e})}),(function(){}),{practice:a.props.active_practiceId,cal_fdate:e.format(),cal_tdate:t.format()})},a.onRangeChange=function(e){if(e.start&&e.end)if(a.appointmentList(D()(e.start),D()(e.end)),1==D()(e.start).date())a.setState({selectedDate:D()(e.start)});else{var t=D()(e.start);a.setState({selectedDate:t.month(t.month()+1).date(1)})}else e.length&&(7==e.length?a.appointmentList(D()(e[0]).subtract(1,"day"),D()(e[e.length-1]).subtract(1,"day")):a.appointmentList(D()(e[0]),D()(e[e.length-1])),a.setState({selectedDate:D()(e[0])}))},a.onSelectedDateChange=function(e){a.setState({selectedDate:D()(e)})},a.setFilterType=function(e){var t=Object(v.a)(a);a.setState({filterType:e.key,selectedDoctor:"ALL",selectedCategory:"ALL"},(function(){"DOCTOR"==e.key?t.changeFilter("selectedDoctor","ALL"):"CATEGORY"==e.key&&t.changeFilter("selectedCategory","ALL")}))},a.setFilter=function(e,t){var n=Object(v.a)(a);a.setState(Object(f.a)({},e,t),(function(){K(e,t),n.changeFilter("tempKey","ALL")}))},a.refreshFilterList=function(){var e=a.state;"DOCTOR"==e.filterType?a.changeFilter("selectedDoctor",e.selectedDoctor):"CATEGORY"==e.filterType&&a.changeFilter("selectedCategory",e.selectedCategory)},a.changeFilter=function(e,t){"selectedDoctor"==e&&"ALL"!=t&&a.loadDoctorTiming(t),a.setState((function(a){var n,o=[];return a.events.forEach((function(n){if(!a.filterCancelledAppointment&&n.appointment.status==Q.m)return!0;"ALL"==t?o.push(n):"selectedDoctor"==e&&n.doctor==t?o.push(n):"selectedCategory"==e&&n.appointment.category==t&&o.push(n)})),n={},Object(f.a)(n,e,t),Object(f.a)(n,"filteredEvent",o),n}))},a.changeState=function(e,t){a.setState(Object(f.a)({},e,t),(function(){K(e,t)}))},a.loadDoctorTiming=function(e){var t=Object(v.a)(a);Object(R.b)(Object(R.e)(M.Y,[a.props.active_practiceId]),(function(a){var n={};a.length&&(n=a[0]);var o={};Q.s.forEach((function(e){o[e]={},n.visting_hour_same_week?(o[e].startTime=D()(n.first_start_time,"HH:mm:ss"),o[e].endTime=D()(n.second_end_time,"HH:mm:ss"),n.is_two_sessions?(o[e].lunch=!0,o[e].lunchStartTime=D()(n.first_end_time,"HH:mm:ss"),o[e].lunchEndTime=D()(n.second_start_time,"HH:mm:ss")):o[e].lunch=!1):n[e]?(o[e].startTime=D()(n["first_start_time_".concat(e)],"HH:mm:ss"),o[e].endTime=D()(n["second_end_time_".concat(e)],"HH:mm:ss"),n["is_two_sessions_".concat(e)]?(o[e].lunch=!0,o[e].lunchStartTime=D()(n["first_end_time_".concat(e)],"HH:mm:ss"),o[e].lunchEndTime=D()(n["second_start_time_".concat(e)],"HH:mm:ss")):o[e].lunch=!1):o[e]=null})),t.setState((function(t){return{doctorTiming:te({},t.doctorTiming,Object(f.a)({},e,te({},o)))}}))}),(function(){}),{doctor:e})},a.state=te({startTime:null,visiblePopover:!1,events:[],filteredEvent:[],appointments:[],practice_doctors:[],practice_categories:[],practice_staff:[],doctors_object:null,categories_object:null,calendarTimings:null,timing:{},loading:!0,selectedDoctor:"ALL",selectedCategory:"ALL",selectedDate:D()(),filterType:"DOCTOR",calendarType:"APPOINTMENTS",doctorsAppointmentCount:{},categoriesAppointmentCount:{},blockedCalendar:[],showCalendarEvents:!0,showAppointments:!0,doctorTiming:{}},q()),a.onSelectSlot=a.onSelectSlot.bind(Object(v.a)(a)),a.onSelectEvent=a.onSelectEvent.bind(Object(v.a)(a)),a.moveEvent=a.moveEvent.bind(Object(v.a)(a)),a.resizeEvent=a.resizeEvent.bind(Object(v.a)(a)),a.loadDoctors=a.loadDoctors.bind(Object(v.a)(a)),a.eventStyleGetter=a.eventStyleGetter.bind(Object(v.a)(a)),a.loadCalendarTimings=a.loadCalendarTimings.bind(Object(v.a)(a)),a.loadCalendarTimings(),a}return Object(A.a)(t,e),Object(b.a)(t,[{key:"componentDidMount",value:function(){var e;this.appointmentList(D()().subtract(1,"days"),D()().add(5,"days")),this.loadDoctors(),e=this,Object(R.b)(Object(R.e)(M.p,[e.props.active_practiceId]),(function(t){var a={},n=t.map((function(e){return a[e.id]=V({},e,{calendar_colour:Object(G.b)(Object(G.a)(e.name))}),a[e.id]}));e.setState({categories_object:a,practice_categories:n})}),(function(){}))}},{key:"loadDoctors",value:function(){var e=this;e.setState({doctorLoading:!0});Object(R.b)(Object(R.e)(M.Cc,[this.props.active_practiceId]),(function(t){var a=[],n=[],o={};t.staff.forEach((function(e){e.role==F.P?(a.push(e),o[e.id]=e):n.push(e)})),e.setState({practice_staff:n,practice_doctors:a,doctors_object:o,doctorLoading:!1})}),(function(){e.setState({doctorLoading:!1})}))}},{key:"loadCalendarTimings",value:function(){var e=this;Object(R.b)(Object(R.e)(M.J,[this.props.active_practiceId]),(function(t){var a={};t.length&&(a=t[0]);var n={};Q.s.forEach((function(e){n[e]={},a.visting_hour_same_week?(n[e].startTime=D()(a.first_start_time,"HH:mm:ss"),n[e].endTime=D()(a.second_end_time,"HH:mm:ss"),a.is_two_sessions?(n[e].lunch=!0,n[e].lunchStartTime=D()(a.first_end_time,"HH:mm:ss"),n[e].lunchEndTime=D()(a.second_start_time,"HH:mm:ss")):n[e].lunch=!1):a[e]?(n[e].startTime=D()(a["first_start_time_".concat(e)],"HH:mm:ss"),n[e].endTime=D()(a["second_end_time_".concat(e)],"HH:mm:ss"),a["is_two_sessions_".concat(e)]?(n[e].lunch=!0,n[e].lunchStartTime=D()(a["first_end_time_".concat(e)],"HH:mm:ss"),n[e].lunchEndTime=D()(a["second_start_time_".concat(e)],"HH:mm:ss")):n[e].lunch=!1):n[e]=null})),e.setState({calendarTimings:te({},a),timing:te({},n),loading:!1})}),(function(){e.setState({loading:!1})}))}},{key:"moveEvent",value:function(e){var t=e.event,a=e.start,n=e.end,o=e.isAllDay;if(t.appointment.status!=Q.Ab)return Object(R.a)(F.fc,"Action Not Allowed"),!0;var s=this.state.events,r=s.indexOf(t),i=t.allDay,c=this;!t.allDay&&o?i=!0:t.allDay&&!o&&(i=!1);var l=te({},t,{start:a,end:n,allDay:i}),m=Object(h.a)(s),d={schedule_at:D()(a).format(),slot:parseInt((n-a)/6e4)},p=function(e){Object(R.a)(F.Wb,"time changed"),m.splice(r,1,l),c.setState({events:m},(function(){c.refreshFilterList()}))},u=function(){};se({title:"Are you sure to change the time of this appointment?",onOk:function(){Object(R.k)(Object(R.e)(M.o,[t.id]),d,p,u)},onCancel:function(){}})}},{key:"onSelectSlot",value:function(e){var t=D()(e.start).format();"doubleClick"==e.action&&(this.setState({startTime:t,redirect:!0}),this.props.history.push("/calendar/create-appointment"))}},{key:"onSelectEvent",value:function(e,t){this.setState({visiblePopover:!0}),this.props.history.push("/patients/appointments/"+e.id)}},{key:"appointmentList",value:function(e,t){var a=this;a.setState({loading:!0});Object(R.b)(Object(R.e)(M.q,[this.props.active_practiceId]),(function(e){a.setState((function(t){t.events;var a=[],n=[],o={},s={};return e.forEach((function(e){var r=new D.a(e.schedule_at).add(e.slot,"minutes"),i={appointment:e,start:new Date(D()(e.schedule_at)),end:new Date(r),title:e.patient.user.first_name,id:e.id,doctor:e.doctor,loading:!1};if(o.ALL?(o.ALL.ALL+=1,e.status==Q.m&&(o.ALL.CANCELLED+=1)):(o.ALL={},o.ALL.ALL=1,e.status==Q.m?o.ALL.CANCELLED=1:o.ALL.CANCELLED=0),e.doctor&&o[e.doctor]?(o[e.doctor].ALL+=1,e.status==Q.m&&(o[e.doctor].CANCELLED+=1)):(o[e.doctor]={},o[e.doctor].ALL=1,e.status==Q.m?o[e.doctor].CANCELLED=1:o[e.doctor].CANCELLED=0),e.category&&o[e.category]?s[e.category]+=1:s[e.category]=1,a.push(i),!t.filterCancelledAppointment&&i.appointment.status==Q.m)return!0;"DOCTOR"==t.filterType&&"ALL"==t.selectedDoctor||"CATEGORY"==t.filterType&&"ALL"==t.selectedCategory?n.push(i):"DOCTOR"==t.filterType&&i.doctor==t.selectedDoctor?n.push(i):"CATEGORY"==t.filterType&&i.appointment.category==t.selectedCategory&&n.push(i)})),{events:a,filteredEvent:n,doctorsAppointmentCount:te({},o),categoriesAppointmentCount:te({},s,{ALL:e.length}),appointments:e,loading:!1}}))}),(function(){a.setState({loading:!1})}),{start:e.format("YYYY-MM-DD"),end:t.format("YYYY-MM-DD")}),this.blockedCalendarTiming(e,t)}},{key:"eventStyleGetter",value:function(e,t,a,n){var o=e.doctor,s=e.appointment.category,r=null,i={borderRadius:"0px",opacity:.8,border:"5px",color:"white",display:"block"};return e.appointment.status==Q.m?(i.backgroundColor="#aaa",i.textDecoration="line-through"):("DOCTOR"==this.state.filterType?r=o&&this.state.doctors_object&&this.state.doctors_object[o]?this.state.doctors_object[o].calendar_colour:"black":"CATEGORY"==this.state.filterType&&(r=s&&this.state.categories_object&&this.state.categories_object[s]?"#"+this.state.categories_object[s].calendar_colour:"black"),i.backgroundColor=r),{style:i}}},{key:"render",value:function(){var e=this,t=this;this.state.calendarTimings&&(new Date(new D.a(this.state.calendarTimings.start_time,"HH:mm:ss")),new Date(new D.a(this.state.calendarTimings.end_time,"HH:mm:ss")));return L.a.createElement(oe,{className:"main-container"},L.a.createElement("div",{style:{padding:"5px"}},L.a.createElement(x.d,null,L.a.createElement(x.b,null,L.a.createElement("div",{style:{backgroundColor:"#fff",padding:"5px 10px"}},L.a.createElement(n.a,{gutter:16},L.a.createElement(o.a,{span:3},L.a.createElement(u.a,{onChange:this.onSelectedDateChange,value:this.state.selectedDate,format:"DD-MM-YYYY",style:{margin:5},allowClear:!1}),"APPOINTMENTS"==this.state.calendarType?L.a.createElement("div",null,t.props.activePracticePermissions.BlockCalendar||t.props.allowAllPermissions?L.a.createElement(d.a,{block:!0,style:{margin:5}},L.a.createElement(P.b,{to:"/calendar/blockcalendar"},L.a.createElement(p.a,{type:"stop"})," Block Calendar")):null,L.a.createElement(l.a,{trigger:"click",overlay:L.a.createElement(m.a,{onClick:this.setFilterType},L.a.createElement(m.a.Item,{key:"DOCTOR"},"DOCTOR"),L.a.createElement(m.a.Item,{key:"CATEGORY"},"CATEGORY"))},L.a.createElement(d.a,{block:!0,style:{margin:5}},this.state.filterType," ",L.a.createElement(p.a,{type:"caret-down"})))):null,L.a.createElement(s.a,{spinning:this.state.doctorLoading},"DOCTOR"==this.state.filterType?L.a.createElement(m.a,{selectedKeys:[this.state.selectedDoctor],size:"small",onClick:function(t){return e.changeFilter("selectedDoctor",t.key)}},"APPOINTMENTS"==this.state.calendarType?L.a.createElement(m.a.Item,{key:"ALL",style:{marginBottom:2,textOverflow:"ellipsis",borderLeft:"5px solid black",borderRight:"none"}},L.a.createElement("span",null,"(",this.state.doctorsAppointmentCount.ALL?this.state.filterCancelledAppointment?this.state.doctorsAppointmentCount.ALL.ALL:this.state.doctorsAppointmentCount.ALL.ALL-this.state.doctorsAppointmentCount.ALL.CANCELLED:0,") All Doctors")):null,this.state.practice_doctors.map((function(t){return L.a.createElement(m.a.Item,{key:t.id,style:{textOverflow:"ellipsis",borderRight:"none",borderLeft:"5px solid "+t.calendar_colour,backgroundColor:e.state.selectedDoctor==t.id?t.calendar_colour:"inherit",color:e.state.selectedDoctor==t.id?"white":"inherit",fontWeight:e.state.selectedDoctor==t.id?"bold":"inherit"}},L.a.createElement("span",null,"(",e.state.doctorsAppointmentCount[t.id]?e.state.filterCancelledAppointment?e.state.doctorsAppointmentCount[t.id].ALL:e.state.doctorsAppointmentCount[t.id].ALL-e.state.doctorsAppointmentCount[t.id].CANCELLED:0,") ",t.user.first_name))}))):L.a.createElement(m.a,{selectedKeys:[this.state.selectedCategory],size:"small",onClick:function(t){return e.changeFilter("selectedCategory",t.key)}},L.a.createElement(m.a.Item,{key:"ALL",style:{marginBottom:2,textOverflow:"ellipsis",borderLeft:"5px solid black",borderRight:"none"}},L.a.createElement("span",null,"(",this.state.categoriesAppointmentCount.ALL?this.state.categoriesAppointmentCount.ALL:0,") All Categories")),this.state.practice_categories.map((function(t){return L.a.createElement(m.a.Item,{key:t.id,style:{textOverflow:"ellipsis",borderRight:"none",borderLeft:"5px solid #"+t.calendar_colour,backgroundColor:e.state.selectedCategory==t.id?"#"+t.calendar_colour:"inherit",color:e.state.selectedCategory==t.id?"white":"inherit",fontWeight:e.state.selectedCategory==t.id?"bold":"inherit"}},L.a.createElement("span",null,"(",e.state.categoriesAppointmentCount[t.id]?e.state.categoriesAppointmentCount[t.id]:0,") ",t.name))}))),L.a.createElement("div",{style:{marginTop:16}},L.a.createElement(c.a.Group,{size:"small",checked:this.state.calendarType,defaultValue:this.state.calendarType,buttonStyle:"solid",onChange:function(t){return e.changeCalendarType(t.target.value)}},L.a.createElement(c.a.Button,{value:"APPOINTMENTS"},L.a.createElement("small",null,"Appointments")),L.a.createElement(c.a.Button,{value:"AVAILABILITY"},L.a.createElement("small",null,"Availability")))),L.a.createElement("div",{style:{position:"fixed",bottom:10,zIndex:9}},this.state.openMorePanel?L.a.createElement("div",{style:{boxShadow:"0 2px 4px #111",border:"1px solid #bbb",borderRadius:2,padding:5,backgroundColor:"white"}},L.a.createElement("ul",{style:{listStyle:"none",paddingInlineStart:0}},L.a.createElement("li",null,L.a.createElement(i.a,{checked:this.state.showCalendarEvents,onChange:function(e){return t.changeState("showCalendarEvents",e.target.checked)}},L.a.createElement("small",null,"Events"))),L.a.createElement("li",null,L.a.createElement(i.a,{checked:this.state.showAppointments,onChange:function(e){return t.changeState("showAppointments",e.target.checked)}},L.a.createElement("small",null,"Appointments"))),L.a.createElement("li",null,L.a.createElement(i.a,{checked:this.state.show24HourCalendar,onChange:function(e){return t.changeState("show24HourCalendar",e.target.checked)}},L.a.createElement("small",null,"24 Hours"))),L.a.createElement("li",null,L.a.createElement(i.a,{checked:this.state.filterCancelledAppointment,onChange:function(e){return t.setFilter("filterCancelledAppointment",e.target.checked)}},L.a.createElement("small",null,"Cancellled Appointment"))),L.a.createElement("li",null,L.a.createElement(r.a,null)),L.a.createElement("li",null,L.a.createElement(P.b,{to:"/settings/clinics-staff#staff"},L.a.createElement("small",null,"Add Doctor"))),L.a.createElement("li",null,L.a.createElement(P.b,{to:"/settings/calendarsettings#timings"},L.a.createElement("small",null," Customize Calendar"))),L.a.createElement("li",null,L.a.createElement("a",null,L.a.createElement("small",null,"Resync")),L.a.createElement(d.a,{onClick:function(){return e.changeState("openMorePanel",!1)},shape:"circle",size:"small",type:"danger",icon:"close",style:{float:"right"}})))):L.a.createElement("a",{onClick:function(){return e.changeState("openMorePanel",!0)}},"More ",L.a.createElement(p.a,{type:"caret-down"}))))),"APPOINTMENTS"==this.state.calendarType?L.a.createElement("div",null,L.a.createElement(o.a,{span:16},L.a.createElement(s.a,{size:"large",spinning:this.state.loading},L.a.createElement(ne,{key:"APPOINTMENTS",defaultDate:new Date,localizer:ae,defaultView:"week",step:10,timeslots:1,truncateEvents:!1,events:this.state.showAppointments?this.state.filteredEvent:[],onEventDrop:this.moveEvent,onEventResize:this.resizeEvent,resizable:!0,selectable:!0,popup:this.onSelectEvent,onSelectSlot:this.onSelectSlot,views:{month:!0,week:ie,day:!0,agenda:!0},style:{height:"calc(100vh - 85px)"},eventPropGetter:this.eventStyleGetter,date:new Date(this.state.selectedDate.format()),onRangeChange:this.onRangeChange,components:{event:function(e){return L.a.createElement(z,Object.assign({},e,t.props))},timeSlotWrapper:function(e){return L.a.createElement(U,Object.assign({},e,{key:e.value.toString(),blockedCalendar:t.state.blockedCalendar,calendarTimings:t.state.timing,doctorTimings:t.state.doctorTiming[t.state.selectedDoctor],filterType:t.state.filterType,selectedDoctor:t.state.selectedDoctor,showCalendarEvents:t.state.showCalendarEvents}))}}}))),L.a.createElement(o.a,{span:5},L.a.createElement(Z,Object.assign({},this.props,this.state,{key:D()(this.state.selectedDate).toISOString()})))):L.a.createElement(o.a,{span:21},L.a.createElement(ne,{key:"AVAILABILITY",defaultDate:new Date,localizer:ae,defaultView:"week",step:10,timeslots:1,truncateEvents:!1,events:this.state.showAppointments?this.state.filteredEvent:[],onEventDrop:this.moveEvent,onEventResize:this.resizeEvent,resizable:!0,selectable:!0,popup:this.onSelectEvent,onSelectSlot:this.onSelectSlot,views:{week:!0,day:!0},style:{height:"calc(100vh - 85px)"},eventPropGetter:this.eventStyleGetter,date:new Date(this.state.selectedDate.format()),onRangeChange:this.onRangeChange,components:{event:function(e){return L.a.createElement(z,Object.assign({},e,t.props))},timeSlotWrapper:function(e){return L.a.createElement(U,Object.assign({},e,{key:e.value.toString(),blockedCalendar:t.state.blockedCalendar,calendarTimings:t.state.timing,doctorTimings:t.state.doctorTiming[t.state.selectedDoctor],filterType:t.state.filterType,selectedDoctor:t.state.selectedDoctor,showCalendarEvents:t.state.showCalendarEvents}))}}}))))))))}}]),t}(T.Component),ie=(t.default=re,function(e){function t(){return Object(g.a)(this,t),Object(y.a)(this,Object(E.a)(t).apply(this,arguments))}return Object(A.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){var e=this.props.date,a=t.range(e);return L.a.createElement(H.a,Object.assign({},this.props,{range:a,eventOffset:15}))}}]),t}(L.a.Component));ie.range=function(e){for(var t=I.add(e,-1,"day"),a=I.add(t,6,"day"),n=t,o=[];I.lte(n,a,"day");)o.push(n),n=I.add(n,1,"day");return o},ie.navigate=function(e,t){switch(t){case _.b.PREVIOUS:return I.add(e,-3,"day");case _.b.NEXT:return I.add(e,3,"day");default:return e}},ie.title=function(e){return" ".concat(e.toLocaleDateString())}}}]);
//# sourceMappingURL=15.f8edac05.chunk.js.map