(window["webpackJsonpbk-erp-front"]=window["webpackJsonpbk-erp-front"]||[]).push([[20],{1802:function(e,t,a){"use strict";a.r(t);a(184);var n=a(58),r=(a(332),a(333)),i=(a(123),a(33)),l=(a(125),a(17)),o=(a(381),a(380)),c=(a(378),a(374)),s=(a(185),a(124)),d=(a(327),a(14)),m=a(34),u=a(63),p=a(64),f=a(67),h=a(65),g=a(30),b=a(66),E=a(0),y=a.n(E),v=(a(925),a(926),a(37)),O=(a(426),a(438)),j=(a(359),a(362)),S=(a(375),a(377)),k=(a(190),a(133)),w=(a(372),a(373)),L=(a(323),a(322)),D=(a(328),a(329)),M=(a(341),a(344)),I=a(18),P=a(35),C=a(324),A=a(86),U=a.n(A),V=(a(38),a(325),a(326)),T=(a(347),a(348)),N=(a(533),a(567)),_=a(4),x=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(f.a)(this,Object(h.a)(t).call(this,e))).loadMeetingDetails=function(){var e=Object(g.a)(a);e.setState({loading:!0});Object(I.c)(Object(I.f)(P.nd,[e.props.meetingId]),(function(t){e.setState({loading:!1,meeting:t})}),(function(){e.setState({loading:!1})}))},a.openWindowLink=function(e){window.open(e)},a.state={loading:!1,meeting:null},a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){this.loadMeetingDetails()}},{key:"copyToClipBoard",value:function(e){navigator.clipboard.writeText(e),Object(I.a)(_.Sb,"Meeting URL & Password copied to clipboard")}},{key:"render",value:function(){var e=this;if(!this.state.meeting)return y.a.createElement(N.a,{status:"warning",title:"Meeting Not Found"});var t=this;return y.a.createElement("div",{style:{width:"300px",minHeight:"200px",overflowY:"scroll",overflowX:"hidden"}},y.a.createElement(r.a,{spinning:this.state.loading},y.a.createElement("div",null,y.a.createElement("h4",null,this.state.meeting.name),y.a.createElement(T.a,{title:"Are you sure to start this meeting?",onConfirm:function(){return t.openWindowLink("https://clinic.bkarogyam.com/webcall/"+e.state.meeting.id)},okText:"Yes",cancelText:"No"},y.a.createElement("a",null,"Meeting Link")),y.a.createElement(s.a,{size:"small",onClick:function(){return e.copyToClipBoard("https://clinic.bkarogyam.com/webcall/"+e.state.meeting.id)},block:!0,shape:"round"},"Copy Link"),y.a.createElement("p",null,this.state.meeting.purpose))))}}]),t}(y.a.Component),F=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(f.a)(this,Object(h.a)(t).call(this,e))).state={loading:!1},a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"componentWillReceiveProps",value:function(){this.loadTodayMeeting()}},{key:"loadTodayMeeting",value:function(){var e=this;this.setState({loading:!0});var t={start:U()().startOf("day").format(),end:U()().endOf("day").format()};Object(I.c)(P.Yb,(function(t){e.setState({filterMeetingList:t,loading:!1})}),(function(){e.setState({loading:!1})}),t)}},{key:"render",value:function(){var e=this.state.filterMeetingList;return console.log("===",e),y.a.createElement("div",null,y.a.createElement(V.a,null,y.a.createElement("a",{type:"primary"},y.a.createElement(d.a,{type:"left"}))," Meeting's Schedule ",y.a.createElement("a",{type:"primary"},y.a.createElement(d.a,{type:"right"}))),y.a.createElement(r.a,{spinning:this.props.loading},y.a.createElement(j.a,{dataSource:e,bordered:!0,renderItem:function(e){return y.a.createElement(j.a.Item,null,y.a.createElement(Z,e))}})))}}]),t}(y.a.Component);function Z(e){return y.a.createElement("div",{style:{width:"100%"}},y.a.createElement("p",{style:{marginBottom:0}},y.a.createElement(O.a,{placement:"right",content:y.a.createElement(x,{meetingId:e.id,key:e.id})},y.a.createElement("span",{style:{width:"calc(100% - 60px)"}},y.a.createElement("b",null,U()(e.start).format("LT")),"\xa0",e.name))))}var z=0,B=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(f.a)(this,Object(h.a)(t).call(this,e))).loadPracticeStaff=function(){var e=Object(g.a)(a);Object(I.c)(Object(I.f)(P.Dc,[e.props.active_practiceId]),(function(t){e.setState({practiceStaff:t.staff})}),(function(){}))},a.loadPatient=function(e){var t=Object(g.a)(a);e&&Object(I.c)(Object(I.f)(P.Vc,[e]),(function(e){e.results.length>0&&t.setState({patientListData:e.results})}),(function(){}))},a.handleSubmit=function(e){var t=Object(g.a)(a);t.setState({loading:!0}),e.preventDefault(),a.props.form.validateFields((function(e,a){if(!e){var n=a;if(a.doctors){a.doctors.length;var r=a.doctors.values(),i=[],l=!0,o=!1,c=void 0;try{for(var s,d=r[Symbol.iterator]();!(l=(s=d.next()).done);l=!0){var m=s.value;i.push(m)}}catch(e){o=!0,c=e}finally{try{l||null==d.return||d.return()}finally{if(o)throw c}}n.doctors=i}if(a.patients){a.patients.length;var u=[],p=a.patients.values(),f=!0,h=!1,g=void 0;try{for(var b,E=p[Symbol.iterator]();!(f=(b=E.next()).done);f=!0){var y=b.value;u.push(y)}}catch(e){h=!0,g=e}finally{try{f||null==E.return||E.return()}finally{if(h)throw g}}n.patients=u}a.other_user&&a.other_user.length;Object(I.j)(P.Xb,n,(function(e){t.setState({loading:!1}),t.props.history.push("/meeting-booking"),t.props.loadData()}),(function(){t.setState({loading:!1})}))}}))},a.addNewUser=function(){Object(g.a)(a);var e=a.props.form,t=e.getFieldValue("keys").concat(z++);e.setFieldsValue({keys:t})},a.removeNewOptionField=function(e){var t=a.props.form,n=t.getFieldValue("keys");t.setFieldsValue({keys:n.filter((function(t){return t!==e}))})},a.loadMeetingList=function(e,t,n){var r=Object(g.a)(a);r.setState({loading:!0});var i={start:e.format(),end:t.format(),zoom_user:n};Object(I.c)(P.Yb,(function(e){r.setState({filterMeetingList:e,loading:!1,meetingNotAllowed:!!e.length})}),(function(){r.setState({meetingNotAllowed:!0,loading:!1})}),i)},a.checkMeetingAvailabilty=function(e,t){var n,r=Object(g.a)(a);a.setState((n={},Object(m.a)(n,e,t),Object(m.a)(n,"loading",!0),n),(function(){r.loadMeetingList(r.state.startSchedule,U()(r.state.startSchedule).add(r.state.duration,"minute"),r.state.zoomUser)}))},a.state={loading:!1,patientListData:[],no_of_participant:1,practiceDoctors:[],practiceStaff:[],zoom_user:[],add_new_user:!1,meetingNotAllowed:!0,duration:30,startSchedule:a.props?U()(a.props.startTime):U()(),filterMeetingList:[]},a.loadPatient=a.loadPatient.bind(Object(g.a)(a)),a.loadZoomUser=a.loadZoomUser.bind(Object(g.a)(a)),a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"componentWillMount",value:function(){this.loadPatient(),Object(C.d)(this),this.loadPracticeStaff(),this.loadMeetingList(this.state.startSchedule,U()(this.state.startSchedule).add(this.state.duration,"minute"))}},{key:"loadZoomUser",value:function(){var e=this;Object(I.c)(P.Zb,(function(t){e.setState({zoom_user:t})}),(function(){}))}},{key:"onChangeParticipant",value:function(e){this.setState({no_of_participant:e})}},{key:"render",value:function(){var e=this,t=this,a=this.props.form,o=a.getFieldDecorator,c=a.getFieldValue,m=this.state.filterMeetingList,u={labelCol:{span:6},wrapperCol:{span:18}};o("keys",{initialValue:[]});var p=c("keys").map((function(e,a){return y.a.createElement("div",null,y.a.createElement(l.a,{span:6,offset:4},y.a.createElement(D.a.Item,{label:"First Name",key:e},o("others[".concat(e,"][first_name]"),{initialValue:""})(y.a.createElement(M.a,{placeholder:"First Name"})))),y.a.createElement(l.a,{span:4},y.a.createElement(D.a.Item,{label:"Last Name"},o("others[".concat(e,"][last_name]"),{initialValue:""})(y.a.createElement(M.a,{placeholder:"Last Name"})))),y.a.createElement(l.a,{span:4},y.a.createElement(D.a.Item,{label:"Email Id"},o("others[".concat(e,"][email]"),{initialValue:""})(y.a.createElement(M.a,{placeholder:"Email Id"})))),y.a.createElement(l.a,{span:4},y.a.createElement(D.a.Item,{label:"phone"},o("others[".concat(e,"][phone]"),{initialValue:""})(y.a.createElement(M.a,{placeholder:"Phone Number"})))),y.a.createElement(l.a,{span:2},y.a.createElement(D.a.Item,{label:" ",colon:!1},y.a.createElement(s.a,{shape:"circle",onClick:function(){return t.removeNewOptionField(e)}},y.a.createElement(d.a,{className:"dynamic-delete-button",type:"minus-circle-o"})),y.a.createElement("br",null))))}));return y.a.createElement(n.a,{title:"Add Booking"},y.a.createElement(i.a,{gutter:16},y.a.createElement(l.a,{span:14},y.a.createElement(D.a,{onSubmit:this.handleSubmit},y.a.createElement(D.a.Item,Object.assign({label:"Purpose"},u),o("name",{initialValue:""})(y.a.createElement(M.a,{placeholder:"Purpose"}))),y.a.createElement(D.a.Item,Object.assign({label:"Agenda"},u),o("agenda",{initialValue:""})(y.a.createElement(M.a.TextArea,{placeholder:"Agenda",rows:3}))),y.a.createElement(D.a.Item,Object.assign({label:"Meeting Admins"},u,{key:"admins"}),o("admins",{initialValue:[]})(y.a.createElement(L.a,{mode:"multiple",placeholder:"Select Admins",style:{width:"100%"}},this.state.practiceStaff.map((function(e){return y.a.createElement(L.a.Option,{value:e.id},e.user.first_name)}))))),y.a.createElement(D.a.Item,Object.assign({label:"Patients"},u,{key:"patient"}),o("patients",{initialValue:[]})(y.a.createElement(L.a,{mode:"multiple",placeholder:"Select Patient",style:{width:"100%"},showSearch:!0,onSearch:this.loadPatient,filterOption:!1},this.state.patientListData.map((function(e){return y.a.createElement(L.a.Option,{value:e.id},e.user.first_name," (",e.custom_id,")")}))))),y.a.createElement(D.a.Item,Object.assign({label:"Doctors"},u,{key:"doctors"}),o("doctors",{initialValue:[]})(y.a.createElement(L.a,{placeholder:"Select Doctors",style:{width:"100%"},mode:"multiple"},this.state.practiceDoctors.map((function(e){return y.a.createElement(L.a.Option,{key:e.id},e.user.first_name)}))))),y.a.createElement(i.a,{gutter:16},p),y.a.createElement(D.a.Item,{wrapperCol:{xs:{span:24,offset:0},sm:{span:18,offset:6}}},y.a.createElement("a",{onClick:function(){return e.addNewUser()}}," ",y.a.createElement(d.a,{type:"plus"})," Add New User")),y.a.createElement(D.a.Item,Object.assign({label:"Booking From"},u),o("start",{initialValue:t.state.startSchedule&&U()(t.state.startSchedule).isValid()?U()(t.state.startSchedule):t.props.startTime&&U()(t.props.startTime).isValid()?U()(t.props.startTime):null})(y.a.createElement(w.a,{format:"YYYY/MM/DD HH:mm",showTime:!0,onChange:function(e){return t.checkMeetingAvailabilty("startSchedule",e)}})),this.state.filterMeetingList.length>0?y.a.createElement(k.a,{message:"Selected time slot Booked!!",type:"warning",showIcon:!0}):null),y.a.createElement(D.a.Item,Object.assign({label:"Duration"},u),o("duration",{initialValue:this.state.duration})(y.a.createElement(S.a,{onChange:function(e){return t.checkMeetingAvailabilty("duration",e)}})),y.a.createElement("span",{className:"ant-form-text"},"Minutes")),y.a.createElement(D.a.Item,u,y.a.createElement(s.a,{type:"primary",htmlType:"submit",style:{margin:5},disabled:this.state.meetingNotAllowed,loading:this.state.loading},"Submit"),t.props.history?y.a.createElement(s.a,{style:{margin:5},onClick:function(){return t.props.history.goBack()}},"Cancel"):null))),y.a.createElement(l.a,{span:6,style:{float:"Right"}},y.a.createElement("div",null,y.a.createElement(r.a,{spinning:this.props.loading},y.a.createElement(j.a,{dataSource:m,bordered:m.length>0,renderItem:function(e){return y.a.createElement(j.a.Item,null,y.a.createElement(Y,e))}}))))))}}]),t}(y.a.Component),R=D.a.create()(B);function Y(e){return y.a.createElement("div",{style:{width:"100%"}},y.a.createElement("p",{style:{marginBottom:0}},y.a.createElement(O.a,{placement:"right",content:y.a.createElement(x,{meetingId:e.id,key:e.id})},y.a.createElement("span",{style:{width:"calc(100% - 60px)"}},y.a.createElement("b",null,U()(e.start).format("LLL")),"\xa0",e.name))))}var W=a(87),H=a(927),X=a.n(H),J=a(972),K=a(934),q=a.n(K),G=a(551),Q=function(e){function t(e){return Object(u.a)(this,t),Object(f.a)(this,Object(h.a)(t).call(this,e))}return Object(b.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return y.a.createElement(O.a,{placement:"right",content:y.a.createElement(x,Object.assign({meetingId:this.props.event.id,key:this.props.event.id},this.props)),trigger:"hover"},y.a.createElement("div",{style:{color:"white",height:"100%"}},y.a.createElement("h1",{style:{color:"white"}},y.a.createElement(d.a,{type:"user"}),this.props.event.name)))}}]),t}(y.a.Component),$=a(389);a(336);function ee(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}a.d(t,"default",(function(){return ne}));var te=X()(J.a),ae=Object(J.c)(U.a),ne=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(f.a)(this,Object(h.a)(t).call(this,e))).onSelectSlot=function(e){var t=Object(g.a)(a),n=U()(e.start);"doubleClick"==e.action&&(t.setState({startTime:n,redirect:!0}),a.props.history.push("/meeting-booking/add"))},a.onRangeChange=function(e){var t=Object(g.a)(a);if(e.start&&e.end)if(1==U()(e.start).date())a.setState({selectedDate:U()(e.start),selectedStartDate:U()(e.start),selectedEndDate:U()(e.end)},(function(){t.loadMeetingList()}));else{var n=U()(e.start);a.setState({selectedDate:n.month(n.month()+1).date(1),selectedStartDate:U()(e.start),selectedEndDate:U()(e.end)},(function(){t.loadMeetingList()}))}else e.length&&(7==e.length?a.setState({selectedDate:U()(e[1]),selectedStartDate:U()(e[0]).subtract(1,"day"),selectedEndDate:U()(e[e.length-1]).add(1,"day")},(function(){t.loadMeetingList()})):(a.loadMeetingList(U()(e[0]),U()(e[e.length-1])),a.setState({selectedDate:U()(e[0]),selectedStartDate:U()(e[0]),selectedEndDate:U()(e[e.length-1])},(function(){t.loadMeetingList()}))))},a.loadMeetingList=function(){var e=Object(g.a)(a);e.setState({loading:!0});var t={start:U()(a.state.selectedStartDate).startOf("day").format(),end:U()(a.state.selectedEndDate).endOf("day").format()};Object(I.c)(P.Yb,(function(t){var a=[];t.forEach((function(e){a.push(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?ee(a,!0).forEach((function(t){Object(m.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):ee(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},e,{title:e.agenda,start:new Date(e.start),end:new Date(e.end)}))})),e.setState({meetingList:a,filterMeetingList:a,loading:!1})}),(function(){}),t)},a.setFilterType=function(e){var t=Object(g.a)(a);a.setState({filterType:e.key,selectedZoomUser:"ALL"},(function(){"Zoom User"==e.key&&t.changeFilter("selectedZoomUser","ALL")}))},a.changeFilter=function(e,t){"selectedDoctor"==e&&"ALL"!=t&&a.loadMeetingList(),a.setState((function(a){var n,r=[];return a.meetingList.forEach((function(a){"ALL"==t?r.push(a):"selectedZoomUser"==e&&a.zoom_user==t&&r.push(a)})),n={},Object(m.a)(n,e,t),Object(m.a)(n,"filterMeetingList",r),n}))},a.state={loading:!1,selectedDate:U()(),selectedStartDate:U()().subtract(1,"days"),selectedEndDate:U()().add(5,"days"),meetingList:[],filterMeetingList:[],filterType:"Zoom User",zoomUser:[]},a.loadZoomUser=a.loadZoomUser.bind(Object(g.a)(a)),a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){this.loadMeetingList()}},{key:"loadZoomUser",value:function(){var e=this;Object(I.c)(P.Zb,(function(t){e.setState({zoomUser:t,loading:!1})}),(function(){e.setState({loading:!1})}))}},{key:"render",value:function(){var e=this,t=this;return y.a.createElement("div",{style:{margin:20}},y.a.createElement(v.d,null,y.a.createElement(v.b,{exact:!0,path:"/meeting-booking/add",render:function(a){return t.props.activePracticePermissions||t.props.CreateMeeting?y.a.createElement(R,Object.assign({},e.state,a,e.props,{loadData:e.loadMeetingList})):y.a.createElement($.a,null)}}),y.a.createElement(v.b,{exact:!0,path:"/meeting-booking/edit/:id",render:function(a){return t.props.activePracticePermissions||t.props.UpdateMeeting?y.a.createElement(R,Object.assign({},a,e.props,e.state,{loadData:e.loadMeetingList})):y.a.createElement($.a,null)}}),y.a.createElement(n.a,{title:"Meeting Booking",extra:y.a.createElement(W.b,{to:"/meeting-booking/add"},y.a.createElement(s.a,{type:"primary"},y.a.createElement(d.a,{type:"plus"})," Add Booking"))},y.a.createElement(r.a,{size:"large",spinning:this.state.loading},y.a.createElement(i.a,{gutter:16},y.a.createElement(l.a,{span:3},y.a.createElement("div",null,y.a.createElement(o.a,{trigger:"click",overlay:y.a.createElement(c.a,null,y.a.createElement(c.a.Item,{key:"Zoom User"},"Zoom User"))},y.a.createElement(s.a,{block:!0,style:{margin:5}},this.state.filterType," ",y.a.createElement(d.a,{type:"caret-down"}))),y.a.createElement(c.a,{defaultSelectedKeys:"ALL",onClick:function(t){return e.changeFilter("selectedZoomUser",t.key)}},y.a.createElement(c.a.Item,{key:"ALL",style:{marginBottom:2,textOverflow:"ellipsis",borderRight:"none"}},y.a.createElement("span",null,"All Zoom User")),this.state.zoomUser.map((function(e){return y.a.createElement(c.a.Item,{key:e.id,style:{textOverflow:"ellipsis",borderRight:"none"}},y.a.createElement("span",null,e.id?e.username:null))}))))),y.a.createElement(l.a,{span:16},y.a.createElement(te,{localizer:ae,startAccessor:"start",defaultView:"week",step:10,timeslots:1,events:this.state.filterMeetingList,selectable:!0,date:new Date(this.state.selectedDate.format()),endAccessor:"end",defaultDate:new Date,views:{month:!0,week:re,day:!0},onSelectSlot:this.onSelectSlot,style:{height:"calc(100vh - 85px)"},onRangeChange:this.onRangeChange,components:{event:function(e){return y.a.createElement(Q,Object.assign({},e,t.props))}}})),y.a.createElement(l.a,{span:5},y.a.createElement(F,Object.assign({},this.props,this.state))))))))}}]),t}(y.a.Component),re=function(e){function t(){return Object(u.a)(this,t),Object(f.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){var e=this.props.date,a=t.range(e);return y.a.createElement(q.a,Object.assign({},this.props,{range:a,eventOffset:15}))}}]),t}(y.a.Component);re.range=function(e){for(var t=G.add(e,-1,"day"),a=G.add(t,6,"day"),n=t,r=[];G.lte(n,a,"day");)r.push(n),n=G.add(n,1,"day");return r},re.navigate=function(e,t){switch(t){case J.b.PREVIOUS:return G.add(e,-3,"day");case J.b.NEXT:return G.add(e,3,"day");default:return e}},re.title=function(e){return" ".concat(e.toLocaleDateString())}}}]);
//# sourceMappingURL=20.a6d6e08f.chunk.js.map