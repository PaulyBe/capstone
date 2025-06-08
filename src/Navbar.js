import React, { useState } from 'react';

function Navbar() {

    const [currentPage, setCurrentPage] = useState('home');

    const renderPageContent = () => {
        switch (currentPage) {
            case 'home':
                return (
                    <div>
                        <h2>Home Page</h2>
                    </div>
                );
            case 'about':
                return (
                    <div>
                        <h2>About Page!</h2>
                    </div>
                );
        }
    }