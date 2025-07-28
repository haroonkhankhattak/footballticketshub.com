import { Ticket } from "./ticket";

export type Listing = {
    listing_id: string;
    broker_id: string;
    section_id: string;
    listing_description: string;
    row: string;
    price: number;
    currency: string;
    attributes: string[];
    togather_upto: string;
    status: string;
    sold_to: string | null;
    sold_date_at: string | null; // ISO date string
    sold_time_at: string | null; // ISO time string
    created_at: string;
    updated_at: string;
    stadium_id: string;
    event_id: string;
    restrictions: string[];
    other_shipping_id: string;
    shipping_type: string;
    sell_as: string;

    // Match details
    match_title: string;
    match_date: string; // ISO date string
    match_venue: string;
    match_slug: string;
    match_league: string;
    match_league_slug: string;

    // Section details
    section_name: string;
    section_stand_name: string;
    section_tier: string;

    // Ticket availability
    total_tickets: number;
    available_tickets: number;

    // tickets details
    tickets: Ticket[]
};
