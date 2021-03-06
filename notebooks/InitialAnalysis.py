#%%
import numpy as np
import dask.dataframe as dd
import matplotlib.pyplot as plt
from mpl_toolkits.basemap import Basemap
import pandas as pd
import os

# %%
df = dd.read_hdf("../data/reduced-data.hdf", "/data")
df
# %%
df.head(10)
# %%
df['species'].nunique().compute()
# %%
groups = df.groupby("species").count().compute()
groups
# %%
groups.to_csv("../data/group-data.csv")
# %%
groups = groups.sort_values("gbifID", ascending=False)
# %%
groups.plot(y="gbifID")
# %%
(groups["gbifID"] > 100000).sum()
# %%
groups.head(10)

#%%
species = "Turdus merula"
subset = df[df['species'] == species]
subset = subset.compute()
subset

#%%
subset = subset.sample(frac=1).reset_index(drop=True)
subset

# %%
fract = 0.1
p = int(fract * subset.shape[0])

fig = plt.figure(figsize=(15, 10))
m = Basemap(projection='cyl',llcrnrlat=-90,urcrnrlat=90,\
            llcrnrlon=-180,urcrnrlon=180,resolution='c')
m.bluemarble()
m.drawparallels(np.arange(-90.,91.,30.))
m.drawmeridians(np.arange(-180.,181.,60.))
m.scatter(subset['decimalLongitude'][:p], subset['decimalLatitude'][:p], c=subset['eventDate'][:p], latlon=True)
plt.title("Equidistant Cylindrical Projection")
# plt.savefig("fig.png")
plt.show()
# %%
frequenc_spec = groups[groups["gbifID"] > 100000]
frequenc_spec

#%%
os.makedirs("../data/subsets", exist_ok=True)
for spec in frequenc_spec.index:
    print(spec)
    print("computing subset")
    subset = df[df['species'] == spec]
    subset = subset.sample(frac=fract).reset_index(drop=True)
    subset = subset.compute()
    print("saving subset")
    subset.to_csv(f"../data/subsets/{spec}.csv")
    print("saving figure")
    fig = plt.figure(figsize=(15, 10))
    m = Basemap(projection='cyl',llcrnrlat=-90,urcrnrlat=90,\
                llcrnrlon=-180,urcrnrlon=180,resolution='c')
    m.bluemarble()
    m.drawparallels(np.arange(-90.,91.,30.))
    m.drawmeridians(np.arange(-180.,181.,60.))
    m.scatter(subset['decimalLongitude'][:p], subset['decimalLatitude'][:p], c=subset['eventDate'][:p], latlon=True)
    plt.title(f"{spec}: {subset.shape[0]} samples")
    plt.savefig(f"../data/subsets/{spec}.png")
    plt.close(fig)
# %%
