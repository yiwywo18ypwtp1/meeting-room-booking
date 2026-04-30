"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getRooms } from "@/api/rooms";
import { Room } from "@/types/rooms";
import { Button } from "@/components/Button";
import { Booking } from "@/types/booking";
import { getBookingsByRoom } from "@/api/bookings";
import { getMe } from "@/api/auth";

import Card from "@/components/TableCard";
import RoomModal from "@/components/RoomModal";
import BookingModal from "@/components/BookingModal";
import AddMemberModal from "@/components/AddMemberModal";

export default function Home() {
	const router = useRouter();

	const [rooms, setRooms] = useState<Room[]>([]);
	const [bookings, setBookings] = useState<Booking[]>([]);

	const [openRoomModal, setOpenRoomModal] = useState(false);
	const [openBookingModal, setOpenBookingModal] = useState(false);
	const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

	const [openMemberModal, setOpenMemberModal] = useState(false);
	const [selectedRoomForMember, setSelectedRoomForMember] = useState<number | null>(null);

	const [me, setMe] = useState<{ id: number; email: string } | null>(null);

	const fetchAll = async () => {
		try {
			const roomsRes = await getRooms();
			setRooms(roomsRes.data);

			const allBookings = [];

			for (const room of roomsRes.data) {
				const res = await getBookingsByRoom(room.id);
				allBookings.push(...res.data);
			}

			setBookings(allBookings);
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		const fetchMe = async () => {
			try {
				const res = await getMe();
				setMe(res.data.user); // тут уже есть id
			} catch (e) {
				console.error(e);
			}
		};

		fetchMe();
	}, []);

	useEffect(() => {
		if (!me) return;

		fetchAll();
	}, [me]);

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (!token) {
			router.replace("/auth");
		}
	}, [router]);

	if (!me) return null;

	const myRooms = rooms.filter((room) =>
		room.members.some((m) => m.userId === me?.id && m.role === "ADMIN")
	);

	const joinedRooms = rooms.filter((room) =>
		room.members.some((m) => m.userId === me?.id && m.role === "USER")
	);


	return (
		<div className="flex-1 w-full grid grid-rows-[auto_1fr_1fr] gap-8">

			{/* HEADER */}
			<div>
				<h1 className="text-zinc-900 text-2xl">Welcome</h1>
				<span className="text-zinc-400 text-md">
					Here’s an overview of your rooms and bookings
				</span>
			</div>

			{/* ROOMS */}
			<div className="grid grid-cols-2 gap-8">
				<Card
					title="My Rooms (I own)"
					action={<Button onClick={() => setOpenRoomModal(true)}>+ Create Room</Button>}
				>
					{myRooms.map((room) => (
						<div key={room.id} className="flex justify-between border-b pb-2 mb-2">
							<div>
								<div className="font-medium text-zinc-900">{room.name}</div>
								<div className="text-sm text-zinc-400">{room.description}</div>
							</div>

							<div className="flex gap-3">
								<Button
									onClick={() => {
										setSelectedRoomForMember(room.id);
										setOpenMemberModal(true);
									}}
								>
									Add user
								</Button>

								<Button
									onClick={() => {
										setSelectedRoomId(room.id);
										setOpenBookingModal(true);
									}}
								>
									Book
								</Button>
							</div>
						</div>
					))}
				</Card>

				<Card title="Rooms I'm a Member Of">
					{joinedRooms.map((room) => (
						<div key={room.id} className="flex justify-between border-b pb-2">
							<div>
								<div className="font-medium text-zinc-900">{room.name}</div>
								<div className="text-sm text-zinc-400">{room.description}</div>
							</div>

							<Button>Open</Button>
						</div>
					))}
				</Card>
			</div>

			{/* BOOKINGS */}
			<Card title="My Bookings">
				{bookings.length === 0 && (
					<div className="text-zinc-400">No bookings yet</div>
				)}

				{bookings.map((b) => (
					<div key={b.id} className="flex justify-between border-b pb-2">
						<div>
							<div className="font-medium text-zinc-900">
								{new Date(b.startTime).toLocaleString()} —{" "}
								{new Date(b.endTime).toLocaleTimeString()}
							</div>

							<div className="text-sm text-zinc-400">
								Room #{b.roomId}
							</div>
						</div>

						<Button>View</Button>
					</div>
				))}
			</Card>

			<RoomModal
				isOpen={openRoomModal}
				onClose={() => setOpenRoomModal(false)}
				onSuccess={fetchAll}
			/>

			{selectedRoomId && (
				<BookingModal
					isOpen={openBookingModal}
					onClose={() => setOpenBookingModal(false)}
					onSuccess={fetchAll}
					roomId={selectedRoomId}
				/>
			)}

			{selectedRoomForMember && (
				<AddMemberModal
					isOpen={openMemberModal}
					onClose={() => setOpenMemberModal(false)}
					onSuccess={fetchAll}
					roomId={selectedRoomForMember}
				/>
			)}
		</div>
	);
}
