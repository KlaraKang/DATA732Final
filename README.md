# 20 Years of U.S. Hate Crimes
This project is to visualize U.S. hate crime incidents reported between 2001 and 2020.
Topics include 1) the volume of hate crime victims across the U.S. states per year, 2) changes in the volume of hate crime victims over the 20 years per state, 3) volume of hate crime incidents by bias type and by victim type per year, 4) distribution of hate crime incidents by the offense type, and 5) size of hate crime incidents by place type where the crimes had occurred over the 20 years.  

Link to my project site: https://klarakang.github.io/DATA732Final/

My code repo: https://github.com/KlaraKang/DATA732Final

## Data Source: 
Federal Bureau of Investigation Crime Data Explorer
The Hate Crime Statistics dataset (Years: 1991-2020, File size: 4.57MB, Last modified: Oct.25, 2021)

URL: https://crime-data-explorer.app.cloud.gov/pages/downloads

## About the original dataset and data preparations:
The original dataset includes the number of victims, offense types, victim types, and location types for each reported hate crime incident occured between 1991 and 2020 that are motivated in whole, or in part, by an offender’s bias against the victim’s perceived race, gender, gender identity, religion, disability, sexual orientation, or ethnicity. However, for my data visualization project, I only included the hate crime records reported between 2001 and 2020, with a total of 145,847 hate crime incidents against 180,925 victims. 
In the original dataset, each incident was reported with up to five bias motivations per offense type. However, generated new datasets that split multiple types of biases, offenses, and locations into multiple rows. To avoid counting the number of victims multiple times due to these multi-biases, the total number of victims in the first two visualizations are calculated only by the state name and data year. The rest of the visualizations are not based on the sums of victims but focused on occurrences or frequencies of different types of biases, offenses, locations, and victims such as individuals, government agents, organizations, law enforcement officers, etc.
The original dataset doesn’t include geographical information, such as Latitude and Longitude for each U.S state. To visualize the data in an U.S. map, I downloaded the geographical information from a Google developer’s site (https://developers.google.com/public-data/docs/canonical/states_csv), and then plugged them into each row of the original dataset.  

## Findings:
1. Year 2020 has the highest reported incidents and highest number of victims for hate crime since 2001.
2. Incidents reported in California, New Jersey, and New York are responsible for over 31% of the hate crime victims.
3. California has the highest number of reported hate crime victims each and every year since 2001.
4. African Americans are the most targeted population for race-biased crimes, each and every year.
5. Anti-Asian incidents increased almost double in the year 2020 compared to the year 2019.
6. Destruction of Property, Intimidation, and Aggravated Assault are the top 3 acts of hate crimes.
7. 31.0% of the time hate crimes occurred in residential areas, 18.5% on highways, and 9.5% in schools.

## My Design Process:
1. Project sketch on a paper and earlier version of 3 charts:
![sketch_v1](https://user-images.githubusercontent.com/88803111/168944077-323894cf-2439-4615-8ed2-d839b5f330e2.jpg)
![US_state](https://user-images.githubusercontent.com/88803111/168944085-40d42ba4-eee1-40aa-aebd-c69b2f08745e.jpg)
![bias_type](https://user-images.githubusercontent.com/88803111/168944114-3a0a658b-9980-4c2b-baf4-dc4a3f90dcef.jpg)
![offense_type](https://user-images.githubusercontent.com/88803111/168944117-f88802b3-1b5a-48d7-a721-326d6d6a1b00.jpg)

2. Latest project sketch and revised charts:
![sketch_v2](https://user-images.githubusercontent.com/88803111/168944140-c22cc9e3-98ae-458c-bfcd-8a0b8a6568b7.jpg)
![USstates](https://user-images.githubusercontent.com/88803111/168944149-d7713e06-f6e8-48f5-a36e-49221dc1a016.jpg)
![ByTypes](https://user-images.githubusercontent.com/88803111/168944164-b35b8988-785e-415d-a09d-f376f10df5fc.jpg)
