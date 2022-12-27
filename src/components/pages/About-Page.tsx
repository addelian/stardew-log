import * as React from "react";
import { Grid, Typography, List, ListItem, ListItemText } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const AboutPage = () => {
    return (
        <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="space-around"
            sx={{ px: 5 }}
        >
            <Grid item>
                <Typography variant="body1">
                    Stardew Log, version 0.5, December 2022. Created by Nic
                    Addelia &nbsp;
                    <FontAwesomeIcon icon={faGithub} />
                    &nbsp;<a href="https://github.com/addelian">@addelian</a>
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1">
                    This app leverages <a href="https://reactjs.org/">React.js</a>{" "}
                    and <a href="https://mui.com/">MUI</a>. It was built to
                    serve as a responsive and relatively un-intrusive companion
                    app for the casual farming / fishing / Haley-impressing
                    simulator Stardew Valley.
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1">
                    It started as a single timer that could handle two inputs:{" "}
                    <strong>crop</strong> and <strong>product type</strong>. The
                    impetus was very much a "first-world problem:" I disliked
                    losing the first ~hour of each day on my farm (or having to
                    restart each morning) due to running to each shed and seeing
                    if my kegs or preserves jars were ready to be collected and
                    refilled, then running back and forth collecting the
                    products and refilling with more crops. I started leaving
                    little reminders for myself in real life, first as a sticky
                    note, then as part of a Google Sheet on my second screen,
                    but I'd frequently forget about the reminder (or would
                    forget to set them up in the first place). I decided to
                    begin developing an app to handle this, and figured I should
                    handle a few more timers and functions to check on other
                    farm life scheduling concerns, like when crops are ready to
                    be harvested or re-planted, or how often fruit tree orchards
                    need picking. The original single timer that I built now
                    exists as the <em>artisan timer builder</em> you can find on
                    the "Log" page.
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1">
                    My personal requirements for the app were simple: I didn't
                    really want to think about it while I was playing the game,
                    so it needed to be a quick and intuitive process to build a
                    timer and update the in-game day to keep track of them. I
                    also didn't want the timers to affect the vanilla game
                    experience - while I enjoy modded games as much as the next
                    person, I still wanted to be able to appreciate the pace and
                    minimal UI within the game itself, while knowing that I had
                    this interface available to me should I decide to build out
                    some timers.
                </Typography>
            </Grid>
            <Grid
                item
                style={{ paddingLeft: 0, paddingRight: 0 }}
                sx={{ px: 0, mx: 0 }}
            >
                <Typography variant="h3">F.A.Q.</Typography>
                <List>
                    <ListItem>
                        <ListItemText>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                I just discovered your app and I want to use it,
                                but I'm currently halfway through a season
                                in-game and I am overwhelmed at the prospect of
                                figuring out how to skip the Log ahead to match
                                where all my products are at right
                                now. Any suggestions?
                            </Typography>
                            <Typography variant="body2">
                                My personal recommendation is to do
                                one of two things: either start adding timers in
                                as you re-plant / harvest items mid-season,
                                which is annoying as you start it up, but will
                                get your timers going as quickly as possible
                                without having to do a bunch of day-counting, or
                                just wait until the{" "}
                                <strong>first day of the next season</strong>{" "}
                                (but not Winter) and follow the below steps:
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Typography variant="body2">
                                <ol style={{ marginTop: 8 }}>
                                    <li>
                                        If you have fully matured fruit trees,{" "}
                                        <strong>add a fruit tree fixture timer</strong>{" "}
                                        (and kill the dialog if you haven't
                                        already).
                                    </li>
                                    <li>
                                        If you have already picked a cave option with Demetrius,{" "}
                                        <strong>add a "Mushroom Cave" or "Fruit Bats" fixture timer.</strong>
                                    </li>
                                    <li>
                                        If you have bee houses and/or tappers
                                        on any of your trees, you have a choice
                                        at this point. The fastest way to get your timers
                                        going and stop thinking about them would be to
                                        smack every one of your tappers and bee houses,
                                        then place them back down immediately and{" "}
                                        <strong>add all tapper and bee house timers needed.</strong>{" "}
                                        Please note that doing this means you are losing any progress made up
                                        to this point on every tapper and bee house you have on your farm.
                                        Alternatively, if you don't want to lose this progress, you'll
                                        have to go with my initial approach of adding timers
                                        one-by-one as the tappers and bee houses are ready
                                        for harvest over the next several days. But if you're
                                        anything like me, you've added tappers in piecemeal
                                        for years and this might be a refreshing restart on
                                        all your timers anyway. <strong> Please note: </strong> if you happen
                                        to be doing these steps on Spring 1, you can simply
                                        <strong> add a "Bee Houses" timer </strong> right away without
                                        worrying about all of this mess, as the houses would have
                                        just started producing honey at this point anyway
                                        without any carry-over from the previous season.
                                    </li>
                                    <li>
                                        Grab whatever seeds you need, get them
                                        planted, and{" "}
                                        <strong>
                                            add harvest timers in for every crop
                                        </strong>
                                        . These timers are accurate to the day
                                        assuming two things: First, that you
                                        never miss a day of watering, and
                                        second, that you{" "}
                                        <em>do not use any fertilizer</em>.
                                        Unfortunately, fertilizers are just
                                        random enough that I didn't feel
                                        comfortable trying to account for the
                                        growth time with them mixed into the
                                        equation. If you're really hankering for
                                        some timers that account for fertilizer,
                                        feel free to make a bunch of custom
                                        timers and shave the growth time of a
                                        given crop down by 10/25/33%, but be
                                        prepared for them to miss the mark every
                                        so often.
                                    </li>
                                    <li>
                                        Whenever your next batch of keg products
                                        and/or preserves jar products are ready
                                        to be collected, fill them up with a new
                                        batch of crops, and{" "}
                                        <strong>add artisan timers</strong> for
                                        each product. You may notice that,
                                        depending on the crop chosen in the
                                        artisan timer, either the "JAR IT" or
                                        "KEG IT" button will turn green, while
                                        the other will turn red. This strictly
                                        serves as a way to remind the user which
                                        choice is better for a given crop (i.e.
                                        more valuable). You can choose either
                                        option every time you create an artisan
                                        timer, but just note that the green
                                        option will always be more valuable for
                                        the given crop.
                                    </li>
                                    <li>
                                        Once your non-regrowing crops reach
                                        harvest time, you'll want to clear their
                                        current timer - the one that says
                                        "(crop) is ready today" - by clicking
                                        the red "x" next to the timer, and add
                                        in another timer of the same type
                                        (assuming you want to re-plant said
                                        crop). Friendly heads up that, if you do
                                        not manually clear a completed timer, it
                                        will remove itself the next day.
                                    </li>
                                    <li>
                                        When the next season rolls around,{" "}
                                        <strong>repeat steps 1-5.</strong>
                                    </li>
                                    <li>
                                        <strong>
                                            A few things to note about the
                                            general flow of the app:
                                        </strong>{" "}
                                        the harvest timer <em>does</em> account
                                        for plants that regrow, i.e. if you
                                        plant strawberries on Spring 1, it will
                                        alert that the first crop is ready on
                                        Spring 9, then the timer will
                                        automatically set itself to 4 days, and
                                        will once again show the strawberries
                                        are ready on Spring 13, and so on
                                        through the end of the season. Speaking
                                        of which, this timer also accounts for
                                        plants that will either die upon season
                                        change, or maintain over season changes,
                                        e.g. when Summer 1 arrives, said
                                        strawberry timer will be removed
                                        automatically, but your coffee bean
                                        timer will persist all the way through
                                        Summer 28.
                                    </li>
                                </ol>
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                Why didn't you include (super common simple
                                feature) that (more popular / more complete SV
                                app) has?
                            </Typography>
                            <Typography variant="body2">
                                The Stardew Log was developed solely to fill a
                                very specific purpose in my playstyle (see
                                above). Any other features were built out after
                                the fact, in accordance with what I thought
                                would most benefit other users. I play the game
                                pretty traditionally, without any mods and with
                                a very "typical" farm setup (i.e., a big area to
                                grow crops, two barns for different animals, and
                                some kegs, preserves jars, and casks).
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                Okay, fine, but even given your approach, why
                                didn't you include anything about villagers /
                                fishing / mining / (other glaring omission from
                                normal gameplay)?
                            </Typography>
                            <Typography variant="body2">
                                You caught me there. Truth be told, I started
                                working on this app after already putting 150
                                hours into my farm. My farm "progress" (insofar
                                as story is concerned) is totally completed.
                                I've fully explored the mines, all of my
                                villager's hearts are maxed out, and I have a
                                spouse and two children. This app could
                                certainly still be helpful to a newer player,
                                but that was not its intent when I built it. If
                                I get a ton of traffic and requests for a
                                villager page or some sort of widget that can
                                remind users of favorite gifts, I'm not opposed
                                to putting it in, but I have no plans to do so
                                for the time being.
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                I have played Stardew Valley for x hours. Would
                                you recommend I use this app?
                            </Typography>
                            <Typography variant="body2">
                                I recommend against using apps like this from
                                the get-go because I personally think min-maxing
                                when still learning the ropes of a game can suck
                                the fun out of it if you stress about it too
                                hard from the start. On the flip side, some
                                people love that approach regardless of
                                playtime, so don't let me tell you how to live
                                your life, I'm not your dad.
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                What's a farm fixture? I'm not seeing
                                that in any legitimate Stardew Valley
                                media. Furthermore, why did you
                                bother building a separate timer for
                                them?
                            </Typography>
                            <Typography variant="body2">
                                There is a subset of items on the farm that
                                don't quite operate like crops, but still
                                require regular attention and "harvesting,"
                                or else they cease to function / produce goods.
                                This subset includes fully matured fruit trees
                                (outside of winter), bee houses (outside of
                                winter), whichever choice you pick with Demetrius
                                for the cave, and tappers on any oak/maple/pine
                                trees you may have placed. Functionally,
                                these timers (and in a lot of ways, the items in-game)
                                are the same as regrowing crops, in that they
                                are hands-off for most of a season as long as you
                                collect their products as they proc.
                                The biggest difference compared to regrowing crops, however,
                                is that once you've got these on your farm, they are {" "}
                                <em>permanently</em> hands-off. So it felt weird putting them in with the
                                rest of the "harvest products" given that once you
                                add these items to your farm, they are likely there
                                for good. Hence, they're "fixtures" of the farm.
                                Much in the same way, I didn't like the fixtures
                                cluttering up the harvest timer lists when you
                                wouldn't have to mess with them much past your first
                                time building them anyway (with exceptions for the
                                bee house and fruit tree timers).
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                Speaking of fruit trees, why don't you account
                                for initial fruit tree growth?
                            </Typography>
                            <Typography variant="body2">
                                Earlier versions of this app had a much different
                                fruit tree timer. There was a pop-up
                                that asked if you were planting a tree, or just
                                resetting the timer at the top of a season, and
                                if you chose the former, it would start a 28-day
                                timer. The problem with this is that I would
                                have had to add further logic to see if the user
                                was accounting for a season change, and if they
                                were growing a fruit tree that would produce
                                fruit in the upcoming season (since fruit trees
                                take an entire season to grow). That's a whole
                                lot of conditional logic for a very specific
                                moment in the lifetime of a user's farm,
                                especially since most folks will only go through
                                the process of building up a fruit orchard once.
                                I felt that a happy medium would be to explain
                                the fruit tree logic in the pop-up when
                                the timer is clicked, as well as remind users
                                that, should they wish to track a new fruit tree
                                for some reason, they could implement their own
                                custom timer. This was also the inspiration
                                behind the custom timer in the first place, for
                                what it's worth.
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                Coffee takes two hours to be brewed in a keg,
                                but the artisan timer indicates that it takes a
                                full day (and/or insert any other timer
                                inaccuracy here). What gives?
                            </Typography>
                            <Typography variant="body2">
                                Part of my personal requirements for this app is
                                that I wanted it to be simple and unintrusive
                                for my own personal use. For certain crops or
                                products to be accurate, there would have to be
                                a live timer built into the app that tracked the
                                real-life flow of in-game time, i.e. I'd have to
                                build an 86-second timer for coffee. This
                                addition is simple by itself, but if the user
                                does anything that interrupts the flow of time
                                in-game, they would have to pause their Stardew
                                Log timer as well. That's against the spirit of
                                the app, in my opinion, not to mention that the
                                whole point of the app is to not have to pay
                                attention to timing that explicitly, whereas
                                keeping live track of each timer in- and
                                out-of-game requires even more attention than
                                just playing the game by itself. At any rate,
                                any time there was a timer that took less than a
                                full day to complete, I rounded it up to a day.
                                That way, I can be sure that when I do get
                                around to checking on my kegs, etc., I can do so
                                with the assurance that the artisan product
                                within will be completed, and I will not have
                                wasted any time trekking back and forth (which
                                was the purpose of this app's creation). If a
                                user really wants this timing to be reflected
                                more accurately, I recommend creating a custom
                                timer set for 0 days. As soon as it's created,
                                the timer will say the product is ready, but
                                then it'll simply stay in the queue for the
                                remainder of the day and hopefully remind the
                                user to pick up the product before the day is
                                done.
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                Why can't I create multiple timers for the same
                                crop or artisan product?
                            </Typography>
                            <Typography variant="body2">
                                Part personal choice, part programming concerns.
                                I kept accidentally selecting the same crop
                                twice when I was building out my timers, which,
                                at best, meant deleting the superfluous timers,
                                or at worst, not being sure which timer was
                                correct if I did it on two separate days,
                                leading to extra trips in and out of the farm,
                                which defeats the purpose of this log in the
                                first place. That annoyance aside, from a
                                programming perspective, dealing with dynamic
                                lists that have self-generating IDs and keys
                                becomes a lot more obnoxious when users can
                                reselect the same option without any sort of
                                restrictions. It's not impossible by any means,
                                but it's a problem that I felt didn't need
                                solving given its lack of utility in the game
                                anyway. If you really want multiple timers for
                                the same crop/product, I'd recommend building
                                custom timers that can track different names,
                                e.g. "Blueberries planted on Summer 1,"
                                "Blueberries planted on Summer 2," and so on. As
                                an aside, if someone wants to refactor my
                                renderList functions to allow multiple entries
                                from the same input in a way that doesn't
                                involve just adding a thousand conditionals onto
                                the ID and key, be my guest! I'd love to shadow
                                you and learn something along the way.
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                I want to create a custom timer longer than 112
                                days. Why are you stifling my creativity? You
                                literally just said you weren't my dad, like,
                                five questions ago.
                            </Typography>
                            <Typography variant="body2">
                                You're right, and I'm terribly sorry. I figure
                                that there are very few reasons to want to build
                                a timer that would last longer than a full
                                Stardew year, and I wanted to put a cutoff
                                somewhere. If folks want the timer max length to
                                be extended, please let me know and I'll change
                                it.
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                What are the random messages along the bottom /
                                bottom right of my screen?
                            </Typography>
                            <Typography variant="body2">
                                They're a random collection of quotes from some
                                of my favorite games, literature, and films.
                                Most geeky 30-somethings (i.e. folks in my
                                demographic) will recognize at least a few of
                                them. As for its functionality, I built out a
                                list of quotes and pull a single quote from it
                                at random every time the page refreshes. There
                                is no rhyme or reason as to which quote is
                                pulled at any given time. It is 100% random.
                                Some of the messages are cryptic in isolation,
                                and I apologize if any come across as
                                off-putting to you. It's probably Hidetaka
                                Miyazaki's fault, if that makes you feel any
                                better.
                            </Typography>
                        </ListItemText>
                    </ListItem>
                </List>
            </Grid>
            <Grid item>
                <Typography variant="body1">
                    Stardew Log is, and will remain, a{" "}
                    <strong>work in progress</strong>. I welcome and encourage
                    any feedback you may have for me. Please reach out to me on
                    GitHub at the above link should you have any suggestions or
                    recommendations, or if you would just like to connect.{" "}
                    <br />
                    Thanks for your time!
                </Typography>
            </Grid>
        </Grid>
    );
};

export default AboutPage;
