# 20 Years of U.S. Hate Crimes
This project is to visualize U.S. hate crime incidents reported between 2001 and 2020.
Topics include 1) the volume of hate crime victims across the U.S. states per year, 2) changes in the volume of hate crime victims over the 20 years per state, 3) volume of hate crime incidents by bias type and by victim type per year, 4) distribution of hate crime incidents by the offense type, and 5) size of hate crime incidents by place type where the crimes had occurred over the 20 years.  

Link to my project site: https://klarakang.github.io/DATA732Final/

My code repo: https://github.com/KlaraKang/DATA732Final

## Data Source: 
Federal Bureau of Investigation Crime Data Explorer
The Hate Crime Statistics dataset (Years: 1991-2020, File size: 4.57MB, Last modified: Oct.25, 2021)

URL: https://crime-data-explorer.app.cloud.gov/pages/downloads
When you visit the download page, look for "Hate Crime" under the "Additional Dataset" section to download a dataset as a zip file.

## About the original dataset and data preparations:
The original dataset (hate_crime.csv) includes the number of victims, offense types, victim types, and location types for each reported hate crime incident occured between 1991 and 2020 that are motivated in whole, or in part, by an offender’s bias against the victim’s perceived race, gender, gender identity, religion, disability, sexual orientation, or ethnicity. However, for my data visualization project, I only included the hate crime records reported between 2001 and 2020, with a total of 145,847 hate crime incidents against 180,925 victims. 
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
2. 
![sketch_v1](https://user-images.githubusercontent.com/88803111/168945201-89b779c0-493f-43d0-b1f1-820b0bea7785.jpg)
![US_state](https://user-images.githubusercontent.com/88803111/168945217-002cf859-e004-433d-bd7c-8dc247089385.jpg)
![bias_type](https://user-images.githubusercontent.com/88803111/168945225-0a53d5ea-77eb-457e-b3e7-ffa6749b3355.jpg)
![offense_type](https://user-images.githubusercontent.com/88803111/168945234-e418d2ad-7230-4d1b-94c8-d545349dd95f.jpg)

These charts seem too bright and too colorful, and they don't really match with my project theme.

2. Things inspired me during the design development workshop:

This image helped me to decide my background color.
![3](https://user-images.githubusercontent.com/88803111/168947435-6e71aefc-258f-44e2-af36-07fb41834d96.jpg)

My moodboard:
![moodboard](https://user-images.githubusercontent.com/88803111/168948136-6e903ad4-09d1-4e78-b8e3-25878954a4ae.png)

Here's my color and palette generation process.
![6 1](https://user-images.githubusercontent.com/88803111/168947917-e385f696-1f17-4a95-910a-35962ca0cb7b.jpg)
![5 1](https://user-images.githubusercontent.com/88803111/168947937-d627acae-f114-421b-9e5f-21cb63468d3a.jpg)

3. Latest project sketch and revised charts:
![sketch_v2](https://user-images.githubusercontent.com/88803111/168945252-ee284705-5b38-409f-871f-7dc3e7fe9eca.jpg)
![USstates](https://user-images.githubusercontent.com/88803111/168945258-5ecc94d9-5f85-4ed2-bb3d-40a5ba03daea.jpg)
![ByTypes](https://user-images.githubusercontent.com/88803111/168945265-b3449aa9-4b28-47ac-a572-eb7ad9e92be4.jpg)
