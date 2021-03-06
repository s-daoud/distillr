# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160707204610) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "checkins", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "drink_id",   null: false
    t.integer  "rating",     null: false
    t.text     "review"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "venue_id"
  end

  add_index "checkins", ["drink_id"], name: "index_checkins_on_drink_id", using: :btree
  add_index "checkins", ["user_id"], name: "index_checkins_on_user_id", using: :btree
  add_index "checkins", ["venue_id"], name: "index_checkins_on_venue_id", using: :btree

  create_table "comments", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "checkin_id", null: false
    t.text     "comment",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "comments", ["checkin_id"], name: "index_comments_on_checkin_id", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "drinks", force: :cascade do |t|
    t.string   "name",        null: false
    t.text     "description"
    t.string   "image_url"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "drinks", ["name"], name: "index_drinks_on_name", unique: true, using: :btree

  create_table "friends", force: :cascade do |t|
    t.integer  "user_id",                        null: false
    t.integer  "friend_id",                      null: false
    t.string   "status",     default: "pending"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
  end

  add_index "friends", ["user_id", "friend_id"], name: "index_friends_on_user_id_and_friend_id", unique: true, using: :btree

  create_table "likes", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "checkin_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "likes", ["checkin_id"], name: "index_likes_on_checkin_id", using: :btree
  add_index "likes", ["user_id"], name: "index_likes_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

  create_table "venues", force: :cascade do |t|
    t.string   "name",        null: false
    t.text     "description"
    t.string   "address",     null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.float    "latitude"
    t.float    "longitude"
  end

  add_index "venues", ["address"], name: "index_venues_on_address", unique: true, using: :btree

end
