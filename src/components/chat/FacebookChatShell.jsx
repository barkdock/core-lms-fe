import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
	ArrowDown,
	CheckCheck,
	ChevronLeft,
	Heart,
	Image,
	MoreHorizontal,
	Paperclip,
	PhoneOff,
	PhoneCall,
	Plus,
	Search,
	SendHorizonal,
	Smile,
	Users,
	Video,
	X,
} from "lucide-react";

const formatNowTime = () =>
	new Date().toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	});

const getMessagePreview = (conversation) => {
	const lastMessage = conversation.messages[conversation.messages.length - 1];
	if (!lastMessage) return "No messages yet";
	return lastMessage.sender === "me" ? `You: ${lastMessage.text}` : lastMessage.text;
};

const FacebookChatShell = ({ title, subtitle, initialConversations = [] }) => {
	const [conversations, setConversations] = useState(initialConversations);
	const [activeConversationId, setActiveConversationId] = useState(initialConversations[0]?.id ?? null);
	const [searchQuery, setSearchQuery] = useState("");
	const [messageInput, setMessageInput] = useState("");
	const [showMobileChat, setShowMobileChat] = useState(false);
	const [isNearBottom, setIsNearBottom] = useState(true);
	const [showScrollToLatest, setShowScrollToLatest] = useState(false);
	const [callModal, setCallModal] = useState({ isOpen: false, type: "voice" });
	const messagesContainerRef = useRef(null);
	const messagesEndRef = useRef(null);
	const previousMessageCountRef = useRef(0);

	useEffect(() => {
		setConversations(initialConversations);
		setActiveConversationId(initialConversations[0]?.id ?? null);
	}, [initialConversations]);

	const filteredConversations = useMemo(() => {
		const query = searchQuery.trim().toLowerCase();
		if (!query) return conversations;

		return conversations.filter((conversation) => {
			const text = `${conversation.contact.name} ${conversation.contact.role} ${getMessagePreview(
				conversation,
			)}`.toLowerCase();
			return text.includes(query);
		});
	}, [conversations, searchQuery]);

	const activeConversation = useMemo(
		() => conversations.find((conversation) => conversation.id === activeConversationId) || null,
		[conversations, activeConversationId],
	);

	useEffect(() => {
		if (!conversations.length) {
			setActiveConversationId(null);
			return;
		}

		const exists = conversations.some((conversation) => conversation.id === activeConversationId);
		if (!exists) {
			setActiveConversationId(conversations[0].id);
		}
	}, [conversations, activeConversationId]);

	const scrollToBottom = (behavior = "smooth") => {
		messagesEndRef.current?.scrollIntoView({ behavior, block: "end" });
	};

	const handleMessagesScroll = () => {
		const container = messagesContainerRef.current;
		if (!container) return;

		const distanceToBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
		const nearBottom = distanceToBottom < 120;
		setIsNearBottom(nearBottom);

		if (nearBottom) {
			setShowScrollToLatest(false);
		}
	};

	useEffect(() => {
		if (!activeConversationId) return;

		setShowScrollToLatest(false);
		setIsNearBottom(true);
		previousMessageCountRef.current = activeConversation?.messages.length ?? 0;
		requestAnimationFrame(() => scrollToBottom("auto"));
	}, [activeConversationId]);

	useEffect(() => {
		if (!activeConversation) return;

		const currentCount = activeConversation.messages.length;
		const previousCount = previousMessageCountRef.current;
		if (currentCount <= previousCount) {
			previousMessageCountRef.current = currentCount;
			return;
		}

		const latestMessage = activeConversation.messages[currentCount - 1];
		const sentByMe = latestMessage?.sender === "me";

		if (isNearBottom || sentByMe) {
			requestAnimationFrame(() => scrollToBottom("smooth"));
			setShowScrollToLatest(false);
		} else {
			setShowScrollToLatest(true);
		}

		previousMessageCountRef.current = currentCount;
	}, [activeConversation, isNearBottom]);

	const selectConversation = (conversationId) => {
		setActiveConversationId(conversationId);
		setShowMobileChat(true);

		setConversations((prev) =>
			prev.map((conversation) =>
				conversation.id === conversationId
					? {
							...conversation,
							unread: 0,
					  }
					: conversation,
			),
		);
	};

	const handleSendMessage = (event) => {
		event.preventDefault();
		const message = messageInput.trim();
		if (!message || !activeConversationId) return;

		setConversations((prev) =>
			prev.map((conversation) => {
				if (conversation.id !== activeConversationId) return conversation;

				return {
					...conversation,
					updatedAt: formatNowTime(),
					messages: [
						...conversation.messages,
						{
							id: Date.now(),
							sender: "me",
							text: message,
							time: formatNowTime(),
							seen: true,
						},
					],
				};
			}),
		);

		setMessageInput("");
	};

	const handleCreateGroup = () => {
		const groupIndex = conversations.filter((conversation) => conversation.contact.isGroup).length + 1;
		const now = formatNowTime();
		const groupId = Date.now();

		const newGroupConversation = {
			id: groupId,
			contact: {
				name: `Study Group ${groupIndex}`,
				role: "Group chat",
				avatar: "",
				online: true,
				isGroup: true,
			},
			updatedAt: now,
			unread: 0,
			messages: [
				{
					id: groupId + 1,
					sender: "them",
					text: "Group created successfully. Invite members and start chatting.",
					time: now,
				},
			],
		};

		setConversations((prev) => [newGroupConversation, ...prev]);
		setActiveConversationId(groupId);
		setShowMobileChat(true);
	};

	const openCallModal = (type = "voice") => {
		setCallModal({ isOpen: true, type });
	};

	const closeCallModal = () => {
		setCallModal((prev) => ({ ...prev, isOpen: false }));
	};

	useEffect(() => {
		if (!callModal.isOpen) return undefined;

		const handleEscape = (event) => {
			if (event.key === "Escape") {
				closeCallModal();
			}
		};

		window.addEventListener("keydown", handleEscape);
		return () => window.removeEventListener("keydown", handleEscape);
	}, [callModal.isOpen]);

	return (
		<motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
			<div className="mb-5">
				<h1 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h1>
				<p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
			</div>

			<div className="card h-[calc(100vh-12rem)] min-h-[580px] overflow-hidden">
				<div className="flex h-full min-h-0">
					<div
						className={`${
							showMobileChat ? "hidden lg:flex" : "flex"
						} w-full max-w-[360px] flex-col border-r border-slate-200 dark:border-slate-800`}
					>
						<div className="border-b border-slate-200 p-4 dark:border-slate-800">
							<div className="mb-3 flex items-center justify-between">
								<p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
									Chats
								</p>
								<button
									type="button"
									onClick={handleCreateGroup}
									className="inline-flex items-center gap-1.5 rounded-full bg-[#1877f2] px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:opacity-90"
								>
									<Plus size={14} />
									New group
								</button>
							</div>

							<div className="relative">
								<Search
									size={16}
									className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
								/>
								<input
									type="text"
									value={searchQuery}
									onChange={(event) => setSearchQuery(event.target.value)}
									placeholder="Search Messenger"
									className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none transition-colors focus:border-[#1877f2] dark:border-slate-700 dark:bg-slate-900"
								/>
							</div>
						</div>

						<div className="flex-1 overflow-y-auto p-2 overscroll-contain">
							{filteredConversations.length ? (
								filteredConversations.map((conversation) => {
									const isActive = conversation.id === activeConversationId;

									return (
										<button
											type="button"
											key={conversation.id}
											onClick={() => selectConversation(conversation.id)}
											className={`mb-1.5 flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors ${
												isActive
													? "bg-[#e7f3ff] dark:bg-slate-800"
													: "hover:bg-slate-100 dark:hover:bg-slate-800/70"
											}`}
										>
											<div className="relative shrink-0">
												{conversation.contact.avatar &&
												!conversation.contact.isGroup ? (
													<img
														src={conversation.contact.avatar}
														alt={conversation.contact.name}
														className="h-12 w-12 rounded-full object-cover"
													/>
												) : (
													<div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-white">
														<Users size={18} />
													</div>
												)}
												{conversation.contact.online && (
													<span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900" />
												)}
											</div>

											<div className="min-w-0 flex-1">
												<div className="mb-0.5 flex items-center justify-between gap-2">
													<p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
														{conversation.contact.name}
													</p>
													<span className="text-[11px] text-slate-400">
														{conversation.updatedAt}
													</span>
												</div>
												<p className="truncate text-[11px] text-[#1877f2] dark:text-slate-300">
													{conversation.contact.role}
												</p>
												<div className="mt-0.5 flex items-center justify-between gap-3">
													<p className="truncate text-xs text-slate-500 dark:text-slate-400">
														{getMessagePreview(conversation)}
													</p>
													{conversation.unread > 0 && (
														<span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#1877f2] px-1.5 text-[10px] font-bold text-white">
															{conversation.unread}
														</span>
													)}
												</div>
											</div>
										</button>
									);
								})
							) : (
								<div className="grid h-full place-items-center p-6 text-center text-sm text-slate-500 dark:text-slate-400">
									No conversation found.
								</div>
							)}
						</div>
					</div>

					<div className={`${showMobileChat ? "flex" : "hidden lg:flex"} min-w-0 flex-1 flex-col`}>
						{activeConversation ? (
							<>
								<div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">
									<div className="flex min-w-0 items-center gap-3">
										<button
											type="button"
											onClick={() => setShowMobileChat(false)}
											className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden dark:text-slate-400 dark:hover:bg-slate-800"
										>
											<ChevronLeft size={18} />
										</button>

										<div className="relative shrink-0">
											{activeConversation.contact.avatar &&
											!activeConversation.contact.isGroup ? (
												<img
													src={activeConversation.contact.avatar}
													alt={activeConversation.contact.name}
													className="h-10 w-10 rounded-full object-cover"
												/>
											) : (
												<div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-white">
													<Users size={15} />
												</div>
											)}
											{activeConversation.contact.online && (
												<span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900" />
											)}
										</div>

										<div className="min-w-0">
											<p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
												{activeConversation.contact.name}
											</p>
											<p className="truncate text-xs text-slate-500 dark:text-slate-400">
												{activeConversation.contact.online
													? "Active now"
													: activeConversation.contact.role}
											</p>
										</div>
									</div>

									<div className="flex items-center gap-1.5 text-[#1877f2]">
										<button
											type="button"
											onClick={() => openCallModal("voice")}
											className="rounded-full p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
										>
											<PhoneCall size={18} />
										</button>
										<button
											type="button"
											onClick={() => openCallModal("video")}
											className="rounded-full p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
										>
											<Video size={18} />
										</button>
										<button
											type="button"
											className="rounded-full p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
										>
											<MoreHorizontal size={18} />
										</button>
									</div>
								</div>

								<div className="relative flex-1 bg-[#f0f2f5] dark:bg-slate-950">
									<div
										ref={messagesContainerRef}
										onScroll={handleMessagesScroll}
										className="h-full space-y-3 overflow-y-auto p-4 overscroll-contain"
									>
										{activeConversation.messages.map((message) => {
											const isMine = message.sender === "me";

											return (
												<div
													key={message.id}
													className={`flex items-end gap-2 ${
														isMine ? "justify-end" : "justify-start"
													}`}
												>
													{!isMine &&
														(activeConversation.contact.avatar &&
														!activeConversation.contact.isGroup ? (
															<img
																src={activeConversation.contact.avatar}
																alt={activeConversation.contact.name}
																className="h-7 w-7 shrink-0 rounded-full object-cover"
															/>
														) : (
															<div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-white">
																<Users size={11} />
															</div>
														))}

													<div
														className={`max-w-[80%] ${
															isMine ? "text-right" : "text-left"
														}`}
													>
														<div
															className={`inline-block rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
																isMine
																	? "rounded-br-md bg-[#1877f2] text-white"
																	: "rounded-bl-md border border-slate-200 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
															}`}
														>
															{message.text}
														</div>
														<div className="mt-1 flex items-center gap-1.5 px-1 text-[11px] text-slate-500 dark:text-slate-400">
															<span>{message.time}</span>
															{isMine && (
																<CheckCheck
																	size={13}
																	className={
																		message.seen
																			? "text-[#1877f2]"
																			: "text-slate-400"
																	}
																/>
															)}
														</div>
													</div>
												</div>
											);
										})}
										<div ref={messagesEndRef} />
									</div>

									{showScrollToLatest && (
										<button
											type="button"
											onClick={() => {
												scrollToBottom("smooth");
												setShowScrollToLatest(false);
												setIsNearBottom(true);
											}}
											className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-[#1877f2] px-3 py-2 text-xs font-semibold text-white shadow-lg transition hover:opacity-90"
										>
											<ArrowDown size={14} />
											New messages
										</button>
									)}
								</div>

								<div className="border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
									<form onSubmit={handleSendMessage} className="flex items-center gap-2">
										<button
											type="button"
											className="rounded-full p-2 text-[#1877f2] transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
										>
											<Paperclip size={18} />
										</button>
										<button
											type="button"
											className="rounded-full p-2 text-[#1877f2] transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
										>
											<Image size={18} />
										</button>

										<div className="flex flex-1 items-center gap-2 rounded-full bg-[#f0f2f5] px-3 py-1.5 dark:bg-slate-800">
											<input
												type="text"
												value={messageInput}
												onChange={(event) => setMessageInput(event.target.value)}
												placeholder="Aa"
												className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-500 dark:text-slate-100"
											/>
											<button
												type="button"
												className="rounded-full p-1 text-[#1877f2] transition-colors hover:bg-slate-200 dark:hover:bg-slate-700"
											>
												<Smile size={17} />
											</button>
										</div>

										<button
											type="submit"
											disabled={!messageInput.trim()}
											className="rounded-full bg-[#1877f2] p-2.5 text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
										>
											<SendHorizonal size={16} />
										</button>
									</form>
								</div>
							</>
						) : (
							<div className="grid flex-1 place-items-center p-8 text-sm text-slate-500 dark:text-slate-400">
								Select a conversation to start chatting.
							</div>
						)}
					</div>
				</div>
			</div>

			<AnimatePresence>
				{callModal.isOpen && activeConversation && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4 backdrop-blur-sm"
					>
						<motion.div
							initial={{ y: 20, scale: 0.96, opacity: 0 }}
							animate={{ y: 0, scale: 1, opacity: 1 }}
							exit={{ y: 20, scale: 0.96, opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-b from-[#1e2b5f] via-[#2c3f8e] to-[#5b6bd9] p-6 text-white shadow-2xl"
						>
							<div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
							<div className="pointer-events-none absolute -left-12 bottom-8 h-32 w-32 rounded-full bg-pink-300/20" />

							<button
								type="button"
								onClick={closeCallModal}
								className="absolute right-4 top-4 rounded-full bg-white/15 p-2 transition hover:bg-white/25"
							>
								<X size={16} />
							</button>

							<div className="relative z-10 flex flex-col items-center text-center">
								<motion.div
									animate={{ scale: [1, 1.05, 1] }}
									transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY }}
									className="mb-4 grid h-24 w-24 place-items-center rounded-full bg-white/20 ring-4 ring-white/20"
								>
									{activeConversation.contact.avatar &&
									!activeConversation.contact.isGroup ? (
										<img
											src={activeConversation.contact.avatar}
											alt={activeConversation.contact.name}
											className="h-20 w-20 rounded-full object-cover"
										/>
									) : (
										<Users size={30} />
									)}
								</motion.div>

								<div className="mb-1 flex items-center gap-1.5 text-pink-200">
									<Heart size={14} className="fill-current" />
									<span className="text-xs font-semibold uppercase tracking-wider">
										Sweet call
									</span>
								</div>

								<h3 className="text-xl font-bold">{activeConversation.contact.name}</h3>
								<p className="mt-1 text-sm text-white/85">
									{callModal.type === "video" ? "Starting cute video call..." : "Calling..."}
								</p>

								<div className="mt-8 flex w-full items-center justify-center gap-4">
									<button
										type="button"
										onClick={closeCallModal}
										className="grid h-14 w-14 place-items-center rounded-full bg-rose-500 text-white shadow-lg transition hover:scale-105"
									>
										<PhoneOff size={20} />
									</button>
									<button
										type="button"
										onClick={closeCallModal}
										className="grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white shadow-lg transition hover:scale-105"
									>
										{callModal.type === "video" ? (
											<Video size={20} />
										) : (
											<PhoneCall size={20} />
										)}
									</button>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

export default FacebookChatShell;
