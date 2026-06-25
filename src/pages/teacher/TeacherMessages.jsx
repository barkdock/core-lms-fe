import FacebookChatShell from "@/components/chat/FacebookChatShell";

const teacherConversations = [
	{
		id: 1,
		contact: {
			name: "Emily Johnson",
			role: "Student - React Advanced Patterns",
			avatar: "https://i.pravatar.cc/120?img=1",
			online: true,
		},
		updatedAt: "2 mins ago",
		unread: 2,
		messages: [
			{
				id: 101,
				sender: "them",
				text: "Hi teacher, I need feedback for my assignment section 3.",
				time: "10:31 AM",
			},
			{
				id: 102,
				sender: "me",
				text: "Sure, your component split is good. I left notes about naming consistency.",
				time: "10:35 AM",
				seen: true,
			},
			{
				id: 103,
				sender: "them",
				text: "Perfect. I will update right away and re-submit.",
				time: "10:37 AM",
			},
		],
	},
	{
		id: 2,
		contact: {
			name: "Michael Chen",
			role: "Student - Node.js & REST APIs",
			avatar: "https://i.pravatar.cc/120?img=12",
			online: true,
		},
		updatedAt: "15 mins ago",
		unread: 1,
		messages: [
			{
				id: 201,
				sender: "them",
				text: "Could you review my API project before demo day?",
				time: "11:20 AM",
			},
			{
				id: 202,
				sender: "me",
				text: "Yes. Share your Postman collection and README in this thread.",
				time: "11:24 AM",
				seen: true,
			},
		],
	},
	{
		id: 3,
		contact: {
			name: "Sarah Williams",
			role: "Student - UI/UX Fundamentals",
			avatar: "https://i.pravatar.cc/120?img=5",
			online: false,
		},
		updatedAt: "1 hour ago",
		unread: 0,
		messages: [
			{
				id: 301,
				sender: "them",
				text: "When is the next live session?",
				time: "9:15 AM",
			},
			{
				id: 302,
				sender: "me",
				text: "Friday at 3 PM. We will do Figma critique and portfolio review.",
				time: "9:20 AM",
				seen: true,
			},
		],
	},
	{
		id: 4,
		contact: {
			name: "David Martinez",
			role: "Student - TypeScript Mastery",
			avatar: "https://i.pravatar.cc/120?img=8",
			online: false,
		},
		updatedAt: "2 hours ago",
		unread: 0,
		messages: [
			{
				id: 401,
				sender: "them",
				text: "Thanks for the detailed explanation about generics.",
				time: "8:30 AM",
			},
			{
				id: 402,
				sender: "me",
				text: "No problem. Next step: build one generic table component for your dashboard.",
				time: "8:37 AM",
				seen: true,
			},
		],
	},
];

const TeacherMessages = () => (
	<FacebookChatShell
		title="Messages"
		subtitle="Reply to students quickly with a familiar Messenger-style layout."
		initialConversations={teacherConversations}
	/>
);

export default TeacherMessages;
