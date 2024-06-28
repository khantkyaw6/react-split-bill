import React, { useState } from "react";

const initialFriends = [
	{
		id: 118836,
		name: "Clark",
		image: "https://i.pravatar.cc/48?u=118836",
		balance: -7,
	},
	{
		id: 933372,
		name: "Sarah",
		image: "https://i.pravatar.cc/48?u=933372",
		balance: 20,
	},
	{
		id: 499476,
		name: "Anthony",
		image: "https://i.pravatar.cc/48?u=499476",
		balance: 0,
	},
];

export default function App() {
	const [friends, setFriends] = useState(initialFriends);
	const [showAddFriend, setShowAddFriend] = useState(false);
	const [selectedFriend, setSelectedFriend] = useState(null);

	console.log({ selectedFriend });

	const handleShowAddFriend = () => {
		setShowAddFriend((show) => !show);
	};

	const handleAddFriend = (friend) => {
		setFriends((friends) => [...friends, friend]);
	};

	const handleFriendSelect = (friend) => {
		setSelectedFriend((cur) => {
			return cur?.id === friend?.id ? null : friend;
		});
	};

	return (
		<div className='app'>
			<div className='sidebar'>
				<FriendList
					friends={friends}
					selectedFriend={selectedFriend}
					handleFriendSelect={handleFriendSelect}
				/>
				{showAddFriend && (
					<FormAddFriend handleAddFriend={handleAddFriend} />
				)}
				<Button onClick={handleShowAddFriend}>
					{showAddFriend ? "Close" : "Add Friend"}
				</Button>
			</div>
			{selectedFriend && (
				<FormSplitBill selectedFriend={selectedFriend} />
			)}
		</div>
	);
}

function FriendList({ friends, handleFriendSelect, selectedFriend }) {
	return (
		<div>
			{friends.map((friend) => (
				<ul key={friend.id}>
					<Friend
						selectedFriend={selectedFriend}
						friend={friend}
						handleFriendSelect={handleFriendSelect}
					/>
				</ul>
			))}
		</div>
	);
}

function Friend({ friend, handleFriendSelect, selectedFriend }) {
	const isSelected = selectedFriend?.id === friend.id;

	return (
		<li className={isSelected ? "selected" : ""}>
			<img src={friend.image} alt='friend image' />
			<h3>{friend.name}</h3>
			{friend.balance > 0 ? (
				<p className='green'>
					{friend.name} owes You {Math.abs(friend.balance)}$
				</p>
			) : friend.balance === 0 ? (
				<p>You and {friend.name} are even</p>
			) : (
				<p className='red'>
					You owe {friend.name} {Math.abs(friend.balance)}$
				</p>
			)}
			<Button onClick={() => handleFriendSelect(friend)}>
				{isSelected ? "Close" : "Select"}
			</Button>
		</li>
	);
}

function Button({ onClick, children }) {
	return (
		<button className='button' onClick={onClick}>
			{children}
		</button>
	);
}

function FormAddFriend({ handleAddFriend }) {
	const [name, setName] = useState("");
	const [image, setImage] = useState("https://i.pravatar.cc/48");

	const handleSubmit = (e) => {
		e.preventDefault();

		if ((!name, !image)) return;
		const id = crypto.randomUUID();
		const newFriend = {
			id,
			name,
			image: `${image}?=${id}`,
			balance: 0,
		};

		console.log(newFriend);

		handleAddFriend(newFriend);
		setName("");
		setImage("https://i.pravatar.cc/48");
	};

	return (
		<form className='form-add-friend' onSubmit={handleSubmit}>
			<label>👨‍🔬 Name </label>
			<input
				value={name}
				onChange={(e) => setName(e.target.value)}
				type='text'
			/>
			<label>🖼️ Image Url</label>
			<input value={image} onChange={(e) => e.target.value} type='text' />
			<Button>Add</Button>
		</form>
	);
}

function FormSplitBill({ selectedFriend }) {
	return (
		<form className='form-split-bill'>
			<h2>Split a bill with {selectedFriend.name}</h2>
			<label>💰 Bill value</label>
			<input type='text' />
			<label>👨‍💻 Your expense</label>
			<input type='text' />
			<label>👬 {selectedFriend.name}'s expense</label>
			<input type='text' disabled />
			<label>Who is paying the bill?</label>
			<select>
				<option value='user'>You</option>
				<option value='friend'>{selectedFriend.name}</option>
			</select>
		</form>
	);
}
