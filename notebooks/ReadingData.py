#%%
import numpy as np
import dask.dataframe as dd
import matplotlib.pyplot as plt

# %%
dtype={'infraspecificEpithet': 'object',
       'recordedBy': 'object',
       'speciesKey': 'float64'}
df = dd.read_csv("../data/0215505-210914110416597.csv", sep="\t", dtype = dtype)
df
# %%
df.head(10)
# %%
df_rel = df[["gbifID", "species", "decimalLatitude", "decimalLongitude", "eventDate"]]
df_rel["eventDate"] = dd.to_datetime(df_rel["eventDate"])
df_rel.head(10)
# %%
df_rel.to_hdf("../data/reduced-data.hdf", "/data", min_itemsize=65)
pass
# %%
