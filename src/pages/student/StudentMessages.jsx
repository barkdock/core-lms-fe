import FacebookChatShell from "@/components/chat/FacebookChatShell";

const studentConversations = [
	{
		id: 1,
		contact: {
			name: "Dr. Sarah Smith",
			role: "React Mentor",
			avatar: "https://i.pravatar.cc/120?img=32",
			online: true,
		},
		updatedAt: "12:45 PM",
		unread: 2,
		messages: [
			{
				id: 11,
				sender: "them",
				text: "Hi! I checked your assignment. State management section is very clean.",
				time: "12:30 PM",
			},
			{
				id: 12,
				sender: "me",
				text: "Awesome, thank you! Can you review my hook naming too?",
				time: "12:36 PM",
				seen: true,
			},
			{
				id: 13,
				sender: "them",
				text: "Sure. Keep custom hooks with use + domain name, very similar to what you did.",
				time: "12:45 PM",
			},
		],
	},
	{
		id: 2,
		contact: {
			name: "Alex Rivera",
			role: "Backend Instructor",
			avatar: "https://i.pravatar.cc/120?img=12",
			online: false,
		},
		updatedAt: "Yesterday",
		unread: 0,
		messages: [
			{
				id: 21,
				sender: "me",
				text: "I finished the REST API milestone.",
				time: "8:55 PM",
				seen: true,
			},
			{
				id: 22,
				sender: "them",
				text: "Great. Push code and share the endpoint list tomorrow morning.",
				time: "9:04 PM",
			},
		],
	},
	{
		id: 3,
		contact: {
			name: "Support Team",
			role: "LMS Support",
			avatar: "https://i.pravatar.cc/120?img=5",
			online: true,
		},
		updatedAt: "Oct 28",
		unread: 0,
		messages: [
			{
				id: 31,
				sender: "them",
				text: "Your payment issue was resolved. Please refresh your dashboard.",
				time: "10:12 AM",
			},
			{
				id: 32,
				sender: "me",
				text: "Got it, everything works now. Thanks team!",
				time: "10:15 AM",
				seen: true,
			},
		],
	},
];

const StudentMessages = () => (
	<FacebookChatShell
		title="Messages"
		subtitle="Chat with instructors and support just like Messenger."
		initialConversations={studentConversations}
	/>
);

export default StudentMessages;
